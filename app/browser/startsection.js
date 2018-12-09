import React, { Component, Fragment } from 'react'
import Loadable from 'react-loadable'
import anime from 'animejs'

import Section from './section'
import Loader from './loader'

import cob_building from '../shared/media/cob_building.jpg'
import happy_volunteer from '../shared/media/happy_volunteer.jpg'
import balcony_chill from '../shared/media/balcony_chill.jpg'
import palm_trees from '../shared/media/palm_trees.jpg'
import crazy_cheesecake from '../shared/media/crazy_cheesecake.jpg'
import organic_garden from '../shared/media/organic_garden.jpg'
import papaya_house from '../shared/media/papaya_house.jpg'

const NoName = Loadable({
    loader: () => import(/* webpackChunkName: 'nonamehostel' */ './noname'),
    loading: defaultProps => <Loader {...defaultProps}/>
})

export default class StartSection extends Component {
    componentDidMount() {
        if (this.props.activeSection) {
            this.scrollToSection()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeSection && this.props.activeSection !== prevProps.activeSection) {
            this.scrollToSection()
        }
    }

    whatRef = React.createRef()

    whyRef = React.createRef()

    howRef = React.createRef()

    volunteerRef = React.createRef()

    scrollToSection = section => {
        let correctSectionRef

        if (this.props.activeSection === 'whatwedo') {
            correctSectionRef = this.whatRef
        } else if (this.props.activeSection === 'whywedo') {
            correctSectionRef = this.whyRef
        } else if (this.props.activeSection === 'howwedo') {
            correctSectionRef = this.howRef
        } else if (this.props.activeSection === 'volunteer') {
            correctSectionRef = this.volunteerRef
        } else {
            return
        }

        anime({
            targets: this.props.scrollTarget,
            scrollTop: correctSectionRef.current.offsetTop,
            easing: 'easeOutQuart',
            duration: 1000
        })
    }

    render() {
        const {isMobile, container} = this.props

        return (
            <Fragment>
                <Section
                    reference={this.whatRef}
                    scrollElement={isMobile ? window : container}
                    backgroundImage={papaya_house}
                    backgroundStyle={{
                        width: isMobile ? '90%' : '60%',
                        transform: `${isMobile ? '0%' : '0%'} ${isMobile ? '0%' : '0%'}`
                    }}
                >
                    <div className={'Section__divider'}>
                        <span>No Name</span>
                        <h2
                            className={'Section__heading'}
                            style={{
                                transform: 'translateX(0px)'
                            }}
                        >
                            Experience
                        </h2>
                    </div>
                </Section>

                <Section
                    scrollElement={isMobile ? window : container}
                    backgroundImage={organic_garden}
                    backgroundStyle={{
                        width: isMobile ? '155%' : '80%',
                        transform: `${isMobile ? '-5%' : '-8%'} ${isMobile ? '0%' : '0%'}`
                    }}
                >
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(3vw)'
                        }}
                    >
                        Organic Garden
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '60%',
                            transform: 'translateX(-4vw)'
                        }}
                    >
                        Small scale herbs and veggies garden
                        to support our kitchens with homegrown supplies.
                        We keep it simple and natural.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '70%',
                            transform: 'translateX(3vw)'
                        }}
                    >
                        <strong>Growing:</strong><br></br>
                        Papaya, Ginger,
                        Turmeric, Spinach, Mint,
                        Tulsi, Pumpkin.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '55%',
                            transform: 'translateX(5vw)'
                        }}
                    >
                        <strong>Volunteer:</strong><br></br>
                        We are looking for permaculture farmers to
                        help support our food requirements.
                    </div>
                </Section>

                <Section
                    scrollElement={isMobile ? window : container}
                    backgroundImage={cob_building}
                    backgroundStyle={{
                        width: isMobile ? '130%' : '58%',
                        transform: {
                            x: '10%',
                            y: '0%'
                        }
                    }}
                >
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-11.5vw)'
                        }}
                    >
                        Eco Projects
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '70%',
                            transform: 'translateX(1vw)'
                        }}
                    >
                        Constructions and techniques working with natural phenomena
                        to reduce limitations of time, money and material.
                        Sharing solutions to support alternative creations.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '55%',
                            transform: 'translateX(-10vw)'
                        }}
                    >
                        <strong>Buildings:</strong>

                        <br></br>

                        Woodfire oven, community kitchen,
                        water cloning station,
                        rocketstoves and bambooroofs.
                    </div>
                </Section>

                <Section>
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(6vw)'
                        }}
                    >
                        Juicebar
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '60%',
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Enjoy vegan and home made recipies
                        in a chillout ambience. Start your day,
                        refresh your afternoon and bring your friends
                        for post dinner desserts and movies.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>Serving:</strong>

                        <br></br>

                        Dairy and vegetable based cakes.
                        Vegan shakes and icecream.
                        Kambucha, cold brew coffee and tea, infused
                        with herbs from the garden.
                        Bread from our woodfire oven.
                        Buddha bowls and salads.
                        Homemade peanutbutter and jams.
                    </div>
                </Section>

                <Section
                    scrollElement={isMobile ? window : container}
                    backgroundImage={crazy_cheesecake}
                    backgroundStyle={{
                        width: isMobile ? '143%' : '75%',
                        transform: {
                            x: '-12%',
                            y: '0%'
                        }
                    }}
                >
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-7vw)'
                        }}
                    >
                        Bakery
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '75%',
                            transform: 'translateX(1vw)'
                        }}
                    >
                        Homemade breads and cakes baked using our
                        woodfire oven complemented with
                        no bake techniques and recipies.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '55%',
                            transform: 'translateX(4vw)'
                        }}
                    >
                        <strong>Baking:</strong>

                        <br></br>

                        Breads, cheesecakes, cookies, cinnamon buns.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '65%',
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        <strong>Volunteer:</strong>

                        <br></br>

                        Opening for experienced baker to help us
                        with the daily making of the home made
                        recipies and to bring their knowledge of
                        food alchemy in our bake-shop.
                    </div>
                </Section>

                <Section>
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Waste Management
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '50%',
                            transform: 'translateX(-7vw)'
                        }}
                    >
                        We belive in responsible living and a conscious
                        waste cycle. All waste is collected, sorted and
                        disposed accordingly.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '60%',
                            transform: 'translateX(5vw)'
                        }}
                    >
                        <strong>Solutions:</strong>

                        <br></br>

                        Composting, High temperature combustion,
                        recycle and reuse.
                    </div>
                </Section>

                <Section
                    reference={this.whyRef}
                    scrollElement={isMobile ? window : container}
                    backgroundImage={palm_trees}
                    backgroundStyle={{
                        width: isMobile ? '90%' : '65%',
                        transform: {
                            x: '0%',
                            y: '0%'
                        }
                    }}
                >
                    <div className={'Section__divider'}>
                        <span>A global</span>
                        <h2
                            className={'Section__heading'}
                            style={{
                                transform: 'translateX(0vw)'
                            }}
                        >
                            Network
                        </h2>
                    </div>
                </Section>

                <Section>
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Home Collective
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(5vw)'
                        }}
                    >
                        Home Collective is the dream of a larger picture that
                        unites the hosts, our guests and the No Name experience
                        that we create together.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '60%',
                            transform: 'translateX(-10vw)'
                        }}
                    >
                        We imagine it as a network of communities
                        and travelers aiming for social impact and sustainable living.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '70%'
                        }}
                    >
                        It wants to be the invitation that encourages involvement and
                        sharing principles within the collective. Participate in the
                        magic of happiness, love and togetherness.
                    </div>

                    <div
                        className={'Section__link'}
                        onClick={this.props.toggleMembership}
                    >
                        <strong>Membership</strong>
                    </div>
                </Section>

                <Section
                    reference={this.howRef}
                    scrollElement={isMobile ? window : container}
                    backgroundImage={balcony_chill}
                    backgroundStyle={{
                        width: isMobile ? '90%' : '67%',
                        transform: {
                            x: '0%',
                            y: '0%'
                        }
                    }}
                >
                    <div className={'Section__divider'}>
                        <span>Help us</span>
                        <h2
                            className={'Section__heading'}
                            style={{
                                transform: 'translateX(0vw)'
                            }}
                        >
                            Manifest
                        </h2>
                    </div>
                </Section>

                <Section>
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-6vw)'
                        }}
                    >
                        Stay with us!
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '60%',
                            transform: 'translateX(3vw)'
                        }}
                    >
                        Visit the homesite located in a tranquil
                        fishing village in the north most part of Goa.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '75%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>No Name Experience:</strong>

                        <br></br>

                        Alchemy of nature therapy, living together & multi-cultural exchange in a handcrafted space.
                    </div>

                    <div className={'Section__box'}>
                        A place crafted with love expressions of
                        thousands of travelers.
                    </div>

                    <div 
                        className={'Section__box'}
                        style={{
                            width: '90%'
                        }}
                    >
                        <NoName />
                    </div>
                </Section>

                <Section
                    reference={this.volunteerRef}
                    scrollElement={isMobile ? window : container}
                    backgroundImage={happy_volunteer}
                    backgroundStyle={{
                        width: isMobile ? '144%' : '80%',
                        transform: {
                            x: '-6%',
                            y: '0%'
                        }
                    }}
                >
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-6vw)'
                        }}
                    >
                        Volunteer
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '60%',
                            transform: 'translateX(3vw)'
                        }}
                    >
                        Embody the soul of the
                        project through your unique contribution.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '75%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>We believe what is done with passion</strong>

                        <br></br>

                        Joining as a volunteer is a way of getting highly involved
                        with the project. Help us with the daily missions in our
                        shared home and express your talent to co-create the No Name Experience.
                    </div>

                    <div
                        className={'Section__link'}
                        onClick={this.props.toggleVolunteer}
                    >
                        <strong>Application and details</strong>
                    </div>
                </Section>

                <Section>
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-6vw)'
                        }}
                    >
                        Crowdfunding
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '60%',
                            transform: 'translateX(4vw)'
                        }}
                    >
                        Home collective membership is an invitation to get
                        involved with the project on a longer term. It requires
                        each member to be a contributor in the funding
                        of the project present and future.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '75%',
                            transform: 'translateX(1vw)'
                        }}
                    >
                        <strong>Get involved:</strong>

                        <br></br>

                        With your contribution we will continue
                        to develop our network and experience.
                        The requested minimum amount is 12€ (1000 india rupees).

                        <br></br>
                    </div>

                    <div className={'Section__link'}>
                        No name go fund me page
                    </div>
                </Section>
            </Fragment>
        );
    }
}