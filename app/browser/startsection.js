import React, { Component, Fragment } from 'react'
import anime from 'animejs'

import Section from './section'
import NoName from './noname'

import cob_building from '../shared/media/cob_building.jpg'
import happy_volunteer from '../shared/media/happy_volunteer.jpg'
import balcony_chill from '../shared/media/balcony_chill.jpg'
import palm_trees from '../shared/media/palm_trees.jpg'
import organic_garden from '../shared/media/organic_garden.jpg'
import papaya_house from '../shared/media/papaya_house.jpg'
import self_care from '../shared/media/self_care.jpeg'
import mr_dj from '../shared/media/mr_dj.jpeg'
import macrame_strings from '../shared/media/macrame_strings.jpeg'

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

    shouldComponentUpdate(prevProps) {
        if (this.props.activeSection === prevProps.activeSection) {
            return false
        } else {
            return true
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
            scrollTop: correctSectionRef.current.offsetTop - 50,
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
                    backgroundImage={organic_garden}
                    backgroundStyle={{
                        width: isMobile ? '155%' : '100%',
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
                    backgroundImage={cob_building}
                    backgroundStyle={{
                        width: isMobile ? '130%' : '100%',
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

                <Section
                    backgroundImage={mr_dj}
                    backgroundStyle={{
                        width: isMobile ? '143%' : '100%',
                        transform: {
                            x: '-12%',
                            y: '0%'
                        }
                    }}
                >
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(6vw)'
                        }}
                    >
                        Yard café
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
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
                    backgroundImage={self_care}
                    backgroundStyle={{
                        width: isMobile ? '160%' : '100%',
                        transform: {
                            x: '0%',
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
                        Self care
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '75%',
                            transform: 'translateX(1vw)'
                        }}
                    >
                        Daily yoga and meditation classes, individual reiki sessions and juggling
                        workshops for a healthy body and mind.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '55%',
                            transform: 'translateX(4vw)'
                        }}
                    >
                        <strong>Facilities:</strong>

                        <br></br>

                        Yoga / meditation rooftop equipped with yoga mats and blocks.
                        Juggling space with props.
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

                        Openings for experienced teachers and facilitators
                        in any of the mentioned activities.
                    </div>
                </Section>

                <Section
                    backgroundImage={macrame_strings}
                    backgroundStyle={{
                        width: isMobile ? '140%' : '100%',
                        transform: {
                            x: '0%',
                            y: '0%'
                        }
                    }}
                >
                    <h2
                        className={'Section__title'}
                        style={{
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Camp fest
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '65%',
                            transform: 'translateX(-7vw)'
                        }}
                    >
                        Campfest is a monthly gathering with an organized flow of workshops,
                        celebrations, skill/ knowledge sharing opportunities, music, movie
                        screenings and a free campsite for all home collective members.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            transform: 'translateX(1vw)'
                        }}
                    >
                        <strong>Upcoming campfests:</strong>

                        <br></br>

                        Febuary 16 - 19

                        <br></br>

                        March 20 - 24
                        
                        <div className={'Section__spacer'}></div>

                        Connect

                        <br></br>
                        
                        freedormculture@gmail.com
                    </div>
                </Section>

                <Section
                    reference={this.whyRef}
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

                        Alchemy of nature therapy, living together and multi-cultural exchange in a handcrafted space.
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
                    backgroundImage={happy_volunteer}
                    backgroundStyle={{
                        width: isMobile ? '144%' : '100%',
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
                        Make the life changing experience of travel accessible to everyone.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '75%',
                            transform: 'translateX(1vw)'
                        }}
                    >
                        The project originated within an international group of friends linked by a common passion for travelling.
                        The intention is to create and co-develop sustainable spaces providing free/ affordable accommodation.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '75%',
                            transform: 'translateX(1vw)'
                        }}
                    >
                        The larger picture of the project is to empower individuals by sharing the benefits from the sustainable community.
                        Benefits of interdependence, life and purity.
                        The project exists because you do.
                        Contribute for the material requirement.
                    </div>

                    <div className={'Section__link'}>
                        <a href={'https://www.gofundme.com/nonamehostel'}>No name go fund me page</a>
                    </div>
                </Section>
            </Fragment>
        );
    }
}