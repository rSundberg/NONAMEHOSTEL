import React, { Component, Fragment } from 'react'

import '../shared/css/activities.css'

import ActivityCategories from './activitycategories'
import ActivityDetails from './activitydetails'
import Activity from './activity'

import AddIcon from '../shared/media/add.svg'

export default class Activities extends Component {
    state = {
        activeType: null,
        categories: null,
        activeCategory: null,
        addActivityToggled: false,
        loading: false,
        error: false,
        projects: null,
        workshops: null
    }

    componentDidMount() {
        this.getActivities('projects')
            .then(queryRef => this.setState({projects: queryRef.docs}))

        this.getActivities('workshops')
            .then(queryRef => this.setState({workshops: queryRef.docs}))
    }

    toggleAddActivity = () => this.setState({addActivityToggled: !this.state.addActivityToggled})

    setType = type => this.setState({activeType: type}, () => {
        this.getCategories(type)
    })

    setCategory = category => this.setState({ activeCategory: category })

    getCategories = type => {
        this.props.firestore
            .collection('activities')
            .doc(type)
            .get()
            .then(doc => doc.data().categories)
            .then(categories => this.setState({categories: categories}))
    }

    getActivities = type => this.props.firestore
        .collection('activities')
        .doc(type)
        .collection('data')
        .where('endDate', '>=', this.props.moment().format('YYYY-MM-DD'))
        .get()

    uploadActivity = (type, data) => this.props.firestore
            .collection('activities')
            .doc(type)
            .collection('data')
            .add(data)

    uploadPicture = (file, docRef) => this.props.storage
        .ref()
        .child(`activity_pictures/${docRef.id}`)
        .put(file)
        .then(snapshot => this.props.storage.ref().child(snapshot.ref.fullPath).getDownloadURL())
        .then(url => this.props.firestore.doc(docRef.path).update({imageUrl: url}))
        .catch(err => console.log(err))

    uploadData = data => {
        let emptyData = Object.keys(data).some(key => !!data[key] === false)

        if (emptyData) {
            this.setState({error: true})

            return
        }

        let dataWithoutImageFile = Object
            .keys(data)
            .reduce((newData, key) => key !== 'imageFile' ? {...newData, ...{[key]: data[key]}} : newData, {})

        let dataWithCategory = {...dataWithoutImageFile, ...{category: this.capitalizeData(this.state.activeCategory)}}
        
        this.setState({loading: true, error: false})

        this.uploadActivity(this.state.activeType, dataWithCategory)
            .then(docRef => data.imageFile ? this.uploadPicture(data.imageFile, docRef) : true)
            .then(docRef => this.getActivities(this.state.activeType))
            .then(queryRef => this.setState({
                activeType: null,
                categories: null,
                activeCategory: null,
                addActivityToggled: false,
                loading: false,
                [this.state.activeType]: queryRef.docs
            }))
    }

    capitalizeData = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            
    render() {
        const { addActivityToggled, activeType, activeCategory, categories, loading, error, projects, workshops } = this.state

        return (
            <div className={'Activities'}>
                <div className={`App__action-box`}>
                    <span
                        className={'Activities__action-title'}
                        onClick={() => this.toggleAddActivity()}
                    >
                        Add activity
                    </span>

                    <AddIcon className={'Activities__icon'}/>

                    {addActivityToggled
                        ? <div className={'Activities__types'}>
                            <div 
                                className={`Activities__type ${activeType === 'projects' ? 'Activities__type--active' : ''}`}
                                onClick={() => this.setType('projects')}>
                                Projects
                            </div>

                            <div 
                                className={`Activities__type ${activeType === 'workshops' ? 'Activities__type--active' : ''}`}
                                onClick={() => this.setType('workshops')}>
                                Workshops
                            </div>
                        </div>
                        : null
                    }

                    {addActivityToggled && activeType && categories
                        ? <ActivityCategories
                            categories={categories}
                            setCategory={this.setCategory}
                            activeCategory={activeCategory}
                            loading={loading === true}
                        />
                        : null
                    }

                    {addActivityToggled && activeType && activeCategory
                        ? <ActivityDetails
                            onConfirmClick={data => this.uploadData(data)}
                            loading={loading === true}
                        />
                        : null
                    }
                </div>

                {error
                    ? <div className={'Activities__error-box'}>
                        You forgot some info for your activity!
                    </div>
                    : null

                }

                <h2 className={'App__title'}>
                    Projects
                </h2>
                {projects
                    ? <Fragment>
                        {projects.map(doc => <Activity {...doc.data()} />)}
                    </Fragment>
                    : null
                }

                <h2 className={'App__title'}>
                    Workshops
                </h2>

                {workshops
                    ? <Fragment>
                        {workshops.map(doc => <Activity {...doc.data()} />)}
                    </Fragment>
                    :null
                }
            </div>
        )
    }
}