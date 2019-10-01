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
                        <h2
                            className={'Section__heading'}
                            style={{
                                transform: 'translateX(0px)'
                            }}
                        >
                            No Name
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
                        Small scale herbs and veggies garden, organic waste compost and plant nursery, natural farming.
                        Permaculture inspired land and sustainable garden concepts.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '70%',
                            transform: 'translateX(3vw)'
                        }}
                    >
                        <strong>Volunteer:</strong><br></br>
                        Help us with the routine garden tasks or design an improvement for the space
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

                        Yoga and meditation rooftop, daily yoga practice and customized sessions.
                        Tree house healing space for personal care.
                        Juggling, flow, slackline space and props. All facilities on donation.
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
                        rocket stoves and bamboo roofs.
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
                        Yard Garden Café
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Home made vegan food prepared and served in a relaxing ambience.
                        Using local ingredients and blending inspirations to deliver our favorite original recipes.
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

                        woodfired bread, bakeries and pizza, plant based desserts,
                        vegan shakes, juices, icecream, kombucha,
                        buddha bowls, homemade peanut butter, tahini and jams.
                    </div>
                </Section>

                <Section
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
                        Artifact
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Display of handcrafted items made by members of the collective.
                        Our support to the nomadic way of life embodied by traveling artisans and creators. 
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>Showroom:</strong>

                        <br></br>

                        Juggling props, Ultra Tribe clothing, Home Collective’s merchandise, guest artist collections.
                    </div>
                </Section>

                <Section
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
                            transform: 'translateX(0vw)'
                        }}
                    >
                        Juggling & Flow Convention 2019
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Gathering of spinners amateurs and flow enthusiasts to share
                        passionate skills and strengthen links among members of the ever growing juggling community.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '65%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>12 - 15 December 2019</strong>

                        <br></br>
                            Workshops, juggling & flow skillsharing, open jams,
                            flea market, fire night and volunteer options.
                    </div>
                </Section>

                <Section
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
                        Experience
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Celebration of life at its fullest.
                        7 days during the peak season to experience a condensed form of what we are building together.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>6th to 12th January 2020</strong>

                        <br></br>
                        Workshops, walks & talks, open air movies,
                        collective arts, higher self care, flea market, open jams…
                    </div>
                </Section>

                <Section
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
                            transform: 'translateX(1vw)'
                        }}
                    >
                        Yoga Convention 2020
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Inviting time to share about yoga philosophies and practices
                        through workshops and activities spread over 3 days,
                        involving diffents healing and self care practices.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>21 - 23 February 2020</strong>

                        <br></br>

                        Yoga, meditation, healing, workshops, community living and network.
                    </div>
                </Section>

                <Section
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
                            transform: 'translateX(1vw)'
                        }}
                    >
                        Seed of life gatherings
                    </h2>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(-2vw)'
                        }}
                    >
                        Events crafted by and for the members of the community.
                        An opportunity to inspire, initiate, share skills & ideas, express talents for the collective.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '80%',
                            transform: 'translateX(0vw)'
                        }}
                    >
                        <strong>6-9 February 2020 & 6-9 March 2020</strong>

                        <br></br>

                        4 days of workshops, talks, skillsharing and celebrations.
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
                        <h2
                            className={'Section__heading'}
                            style={{
                                transform: 'translateX(0vw)'
                            }}
                        >
                            Global Network
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
                        The dream of a larger picture that unites the hosts,
                        our guests and the experience that we create together.
                        A global network with ideas of community development,
                        cultural exchange, sustainable lifestyle, eco living and collective empowerment.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '60%',
                            transform: 'translateX(-10vw)'
                        }}
                    >
                        We imagine it as a network of communities and travelers passionate about co-living, eco-projects,
                        natural sciences, waste management, permaculture, sharing, healthy mind, body and life.
                    </div>

                    <div
                        className={'Section__box'}
                        style={{
                            width: '70%'
                        }}
                    >
                        To become a member of Home Collective :
                        be a contributor in the monetary part of the project
                        with a minimum donation and experience a stay at No Name.
                    </div>

                    <div
                        className={'Section__link'}
                        onClick={this.props.toggleMembership}
                    >
                        <strong>Read more</strong>
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
                        <a href={'https://www.gofundme.com/nonamehostel'}>Donate now</a>
                    </div>
                </Section>
            </Fragment>
        );
    }
}