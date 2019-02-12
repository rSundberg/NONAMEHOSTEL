import React, { Component, Fragment } from 'react';
import anime from 'animejs'

import '../shared/css/volunteer.css'

export default class Volunteer extends Component {
    render() {
        return (
            <Fragment>
                <h2 className={'Page__title'}>Volunteer</h2>

                <h2 className={'App__title'}>What is it about?</h2>

                <p className={'Volunteer__text'}>
                    The Home life articulates three main activities
                </p>

                <p className={'Volunteer__text'}>
                    – a special hospitality, give a unique experience
                        for every guest to feel at home.
                </p>

                <p className={'Volunteer__text'}>
                    – a strong online presence, to spread the word and connect widely.
                </p>

                <p className={'Volunteer__text'}>
                    – an innovative home care, for everything related to the property’s look,
                        vibes and facilities.
                </p>

                <p className={'Volunteer__text'}>
                    Volunteering with us is a way to get highly involved with the project,
                    participate to its shared vision and exercise your skills for the common
                    manifestation of the collective dream.
                </p>

                <h2 className={'App__title'}>Root principles</h2>

                <p className={'Volunteer__text'}>
                    To hold the team all together we prefer strong roots to a rigid frame,
                    here are the directing principles of life in community, as we understand it:
                </p>

                <p className={'Volunteer__text'}>
                    1. The project and the vision it manifests being our reason to be there
                </p>

                <p className={'Volunteer__text'}>
                    2. Thinking, speaking, doing with pure and good intentions
                </p>

                <p className={'Volunteer__text'}>
                    3. Taking responsibilities and working within the imparted time
                </p>

                <p className={'Volunteer__text'}>
                    4. Always respecting who and what is around you
                </p>

                <p className={'Volunteer__text'}>
                    5. Representing our Home and its principles during the whole volunteering period
                </p>

                <h3 className={'App__title'}>Volunteer missions</h3>

                <div className={'Volunteer__missions'}>
                    <div className={'Volunteer__box Volunteer--center'}>
                        <h3 className={'Volunteer__mission-title'}>Hospitality</h3>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Hosting</h3>

                        <p className={'Volunteer__text'}>
                            Welcome the guests, prepare rooms, deliver essential information and handle guests flow.
                        </p>

                        <p className={'Volunteer__text'}>
                            Social, organisation, administration skills.
                        </p>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Cantine</h3>

                        <p className={'Volunteer__text'}>
                            Plan daily meals and requisition list,
                            cook 2 meals a day for hosts and guests.
                            Care for the kitchen space and material.
                        </p>

                        <p className={'Volunteer__text'}>
                            Organisation, cleanliness, good vibes.
                        </p>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Bakery</h3>

                        <p className={'Volunteer__text'}>
                            Bake your favourite recipes of bread and cakes,
                            propose new ones. Care for the baking material and space.
                        </p>

                        <p className={'Volunteer__text'}>
                            Fire/Clay oven experience is a plus.
                        </p>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Juice Bar</h3>

                        <p className={'Volunteer__text'}>
                            Prepare the juice bar before service,
                            help with orders and deliveries.
                            Help in making food and drinks.
                        </p>

                        <p className={'Volunteer__text'}>
                            Smile, cleanliness and food enthusiasm.
                        </p>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Yoga Sessions</h3>

                        <p className={'Volunteer__text'}>
                            Organise daily yoga practices to balance
                            physical and spiritual accommodation in the community.
                        </p>

                        <p className={'Volunteer__text'}>
                            Regularity, attention, will to share.
                        </p>
                    </div>
                </div>

                <div className={'Volunteer__missions'}>
                    <div className={'Volunteer__box Volunteer--center'}>
                        <h3 className={'Volunteer__mission-title'}>Presence</h3>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Photography</h3>

                        <p className={'Volunteer__text'}>
                            Empower the House by observing the life activity and capturing its movements.
                            Expose the different aspect of life through your camera.
                        </p>

                        <p className={'Volunteer__text'}>
                            Observation, patience, curiosity.
                        </p>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Musicians</h3>

                        <p className={'Volunteer__text'}>
                            Open mics, bonfire jam sessions and parties is very appreciated activities.
                            We are looking for passionate musicians who wants to contribute to the daily vibe and events.
                        </p>

                        <p className={'Volunteer__text'}>
                            Instruments, vibes and smiles.
                        </p>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Social media / Content creation</h3>

                        <p className={'Volunteer__text'}>
                            Help us keep in touch with the collective through our digital channels.
                            Create, organise and inform about events and content.
                        </p>

                        <p className={'Volunteer__text'}>
                            Socialize, share and express
                        </p>
                    </div>
                </div>

                <div className={'Volunteer__missions'}>
                    <div className={'Volunteer__box Volunteer--center'}>
                        <h3 className={'Volunteer__mission-title'}>Home Care</h3>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Garden</h3>

                        <p className={'Volunteer__text'}>
                            Imagine and create the garden spaces in relevance with the environment.
                            Design, plant and take care. Optimize watering systems.
                        </p>

                        <p className={'Volunteer__text'}>
                            Gardening skills, love for nature, permaculture enthusiasm.
                        </p>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Waste</h3>

                        <p className={'Volunteer__text'}>
                            Reduce and segregate waste in the property.
                            Create compost for the cultivation to come and handle the plastic disposal.
                            Improve the existing systems and imagine new solutions.
                        </p>

                        <p className={'Volunteer__text'}>
                            Attention, confidence, patience.
                        </p>
                    </div>

                    <div className={'Volunteer__box'}>
                        <h3 className={'Volunteer__heading'}>Pet Care</h3>

                        <p className={'Volunteer__text'}>
                            Give daily food to the pets, provide medical care when needed.
                            Participate in animal welfare with local associations.
                        </p>

                        <p className={'Volunteer__text'}>
                            Basic experience with animals, attention, love.
                        </p>
                    </div>
                </div>

                <h2 className={'App__title'}>How to apply</h2>

                <p className={'Volunteer__text'}>
                    The volunteers will be selected according to the fit between the hostel’s needs
                    and the displayed experience and motivation.
                    The hostel’s welcoming capacity is flexible and the number of volunteer is not
                    restricted to one per role.
                </p>

                <p className={'Volunteer__text'}>
                    Tell us as much as possible in the application form
                    so we can understand where you would enjoy and fit the project’s needs!
                    Not being selected shouldn’t discourage anyone from applying for the future volunteer
                    positions at the hostel.
                </p>

                <p className={'Volunteer__heading'}>Minimum duration: 1 month</p>

                <p className={'Volunteer__heading'}>Applications close on 20th of the previous month.</p>

                <div className={'Volunteer__divider'}>
                    <div className={'Volunteer__link'}>
                        <a href={'https://goo.gl/forms/dOTVSU5Z5p5QWJEs1'}>Application form</a>
                    </div>
                </div>
            </Fragment>
        );
    }
}