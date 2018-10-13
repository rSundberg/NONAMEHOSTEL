import React, { Component, Fragment } from 'react'
import Loadable from 'react-loadable'
import anime from 'animejs'

import Section from './section'
import Loader from './loader'

const NoName = Loadable({
    loader: () => import(/* webpackChunkName: 'nonamehostel' */ './noname'),
    loading: defaultProps => <Loader {...defaultProps}/>
})

export default class StartSection extends Component {
    state = {
        noNameToggled: false
    }

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
        return (
            <Fragment>
                <Section reference={this.whatRef}>
                    <div className={'Section__divider'}>
                        <span>A day at</span>
                        <h2
                            className={'Section__heading'}
                            style={{
                                transform: 'translateX(0px)'
                            }}
                        >
                            No name
                        </h2>
                    </div>
                </Section>

                <Section>
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

                <Section>
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-10vw)'
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
                            transform: 'translateX(3vw)'
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

                <Section>
                    <h2
                        className={'Section__title'}
                    >
                        Degradeable Soaps
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '55%',
                            transform: 'translateX(-3vw)'
                        }}
                    >
                        Most of the water from showers and washing areas
                        have a passive water cycle to water the garden.
                        To sustain this cycle we make soaps and cleaning
                        materials at home using natural ingredients.
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

                <Section>
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

                <Section reference={this.whyRef}>
                    <div className={'Section__divider'}>
                        <span>Dream of</span>
                        <h2
                            className={'Section__heading'}
                            style={{
                                transform: 'translateX(0vw)'
                            }}
                        >
                            Home Collective
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
                        Membership
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

                        <a className={'Section__link'}>
                            No name go fund me page
                        </a>
                    </div>
                </Section>

                <Section>
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(4vw)'
                        }}
                    >
                        Network
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '55%',
                            transform: 'translateX(7vw)'
                        }}
                    >
                        The project originated within an international
                        group of friends linked by a common passion for travelling.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '60%',
                            transform: 'translateX(3vw)'
                        }}
                    >
                        The aim is to connect people, experiencing
                        and creating social sustainable lifestyles.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '45%',
                            transform: 'translateX(-4vw)'
                        }}
                    >
                        We want this to be accessible to people
                        that contributes, no matter where you are.
                    </div>
                </Section>

                <Section>
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-4vw)'
                        }}
                    >
                        Tools
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '55%',
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        We are designing and creating a space for
                        seamless sharing.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '35%',
                            transform: 'translateX(4vw)'
                        }}
                    >
                        A space on the web to help you interact with
                        the collective.
                    </div>
                </Section>

                <Section reference={this.howRef}>
                    <div className={'Section__divider'}>
                        <span>Manifest the</span>
                        <h2
                            className={'Section__heading'}
                            style={{
                                transform: 'translateX(0vw)'
                            }}
                        >
                            Experience
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
                        Express your freedom and
                        embody the soul of the
                        project through your unique contribution.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '75%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>Let's co-create:</strong>

                        <br></br>

                        Joining our shared Home as volunteer
                        requires the ability to work with focused mind,
                        in a team as well as individually,
                        while understanding the place and time requirements.
                        It also implies an extraordinary human experience in
                        a magical place, among friends of an extended family.
                    </div>

                    <div className={'Section__box'}>
                        <div
                            className={'Section__link'}
                            onClick={() => this.setState(({noNameToggled}) => ({noNameToggled: !noNameToggled}))}
                    >
                            <strong>Discover No Name</strong>
                        </div>

                        { this.state.noNameToggled
                            ? <NoName />
                            : null
                        }
                    </div>                    
                </Section>

                <Section reference={this.volunteerRef}>
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
                        Express your freedom and
                        embody the soul of the
                        project through your unique contribution.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '75%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>Let's co-create:</strong>

                        <br></br>

                        Joining our shared Home as volunteer
                        requires the ability to work with focused mind,
                        in a team as well as individually,
                        while understanding the place and time requirements.
                        It also implies an extraordinary human experience in
                        a magical place, among friends of an extended family.
                    </div>

                    <div className={'Section__box'}>
                        <div
                            className={'Section__link'}
                            onClick={() => this.props.toggleVolunteer()}
                        >
                            <strong>Application and details</strong>
                        </div>
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

                        <a className={'Section__link'}>
                            No name go fund me page
                        </a>
                    </div>
                </Section>
            </Fragment>
        );
    }
}