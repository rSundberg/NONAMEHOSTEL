import React, { Component } from 'react'
import '../shared/css/noname.css'

import FreeIcon from '../shared/media/free_stay.svg'
import DormIcon from '../shared/media/dorm_stay.svg'
import RoomIcon from '../shared/media/room_stay.svg'
import CommunityKitchenIcon from '../shared/media/community_kitchen.svg'
import JuiceBarIcon from '../shared/media/juicebar.svg'
import BakeryIcon from '../shared/media/bakery.svg'
import WorkshopsIcon from '../shared/media/workshops.svg'
import CampfestIcon from '../shared/media/camp_fest.svg'
import KerimIcon from '../shared/media/kerim.svg'
import ArambolIcon from '../shared/media/arambol.svg'
import BanyanIcon from '../shared/media/banyon_tree.svg'
import GardenIcon from '../shared/media/garden.svg'
import RecycleIcon from '../shared/media/recycle.svg'
import ToiletIcon from '../shared/media/toilet.svg'
import SolarIcon from '../shared/media/solar_panel.svg'
import WifiIcon from '../shared/media/wifi.svg'
import ProductiveIcon from '../shared/media/productive_space.svg'
import DigitalLabIcon from '../shared/media/digital_lab.svg'
import HammerIcon from '../shared/media/hammer.svg'

import HomeImg from '../shared/media/WS-HOME.jpg'
import KitchenImg from '../shared/media/WS-KITCHEN.jpg'
import MangoFieldImg from '../shared/media/WS-MANGO-FIELD.jpg'
import ExpeditionImg from '../shared/media/EXPEDITION.jpg'
import GardenImg from '../shared/media/GARDEN.jpg'
import VolunteerImg from '../shared/media/VOLUNTEER.jpg'

export default class NoName extends Component {
    render() {
        return (
            <div className={'NoName'}>
                <h2 className={'NoName__title'}>
                    A place crafted with love expressions of
                    thousands of travelers.
                </h2>

                <img
                    className={'NoName__img'}
                    src={HomeImg}
                />

                <div className={'NoName__icon-box'}>
                    <FreeIcon style={{ strokeWidth: '10px' }}/>

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Free beds</h2>

                        <p className={'NoName__icon-description'}>
                            Get a spot in a tent or pitch your own, free for members.
                        </p>
                    </div>
                </div>

                <div className={'NoName__icon-box'}>
                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Dorm beds</h2>

                        <p className={'NoName__icon-description'}>
                            Single bed with beddings in a shared room.
                        </p>
                    </div>

                    <DormIcon style={{ strokeWidth: '10px' }}/>
                </div>

                <div className={'NoName__icon-box'}>
                    <RoomIcon style={{ strokeWidth: '10px' }} />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Rooms</h2>

                        <p className={'NoName__icon-description'}>
                            Doubble bed with bathroom and balcony.
                        </p>
                    </div>

                </div>

                <img
                    className={'NoName__img'}
                    src={KitchenImg}
                />

                <div className={'NoName__icon-box'}>
                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Community meals</h2>

                        <p className={'NoName__icon-description'}>
                            In house kitchen offers two vegetarian meals on donation.
                        </p>
                    </div>

                    <CommunityKitchenIcon />
                </div>

                <div className={'NoName__icon-box'}>
                    <JuiceBarIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Juice bar</h2>

                        <p className={'NoName__icon-description'}>
                            Serving fresh juice, food and desserts from locally sourced
                            and homegrown ingredients.
                        </p>
                    </div>
                </div>

                <div className={'NoName__icon-box'}>
                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Bakery</h2>

                        <p className={'NoName__icon-description'}>
                            Homemade bread baked in a woodfire clay owen.
                        </p>
                    </div>

                    <BakeryIcon />
                </div>

                <img
                    className={'NoName__img'}
                    src={MangoFieldImg}
                />

                <div className={'NoName__icon-box'}>
                    <WorkshopsIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Workshops</h2>

                        <p className={'NoName__icon-description'}>
                            Facility for sharing knowledge and skills.
                        </p>
                    </div>
                </div>

                <div className={'NoName__icon-box'}>
                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Campfest</h2>

                        <p className={'NoName__icon-description'}>
                            Monthly celebration with art, music and workshops.
                        </p>
                    </div>

                    <CampfestIcon />
                </div>

                <img
                    className={'NoName__img'}
                    src={ExpeditionImg}
                />

                <div className={'NoName__icon-box'}>
                    <KerimIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Kerim beach</h2>

                        <p className={'NoName__icon-description'}>
                            1KM. Described as the most beautiful beach of north Goa.
                        </p>
                    </div>
                </div>

                <div className={'NoName__icon-box'}>
                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Arambol beach</h2>

                        <p className={'NoName__icon-description'}>
                            7KM. Drumcircle, beach shacks and all the animation,
                            reachable by motorbike.
                        </p>
                    </div>

                    <ArambolIcon />
                </div>

                <div className={'NoName__icon-box'}>
                    <BanyanIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Sweet water lake</h2>

                        <p className={'NoName__icon-description'}>
                            Mild hike into the jungle with the famous banyan tree.
                        </p>
                    </div>
                </div>

                <img
                    className={'NoName__img'}
                    src={GardenImg}
                />

                <div className={'NoName__icon-box'}>
                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Organic garden</h2>

                        <p className={'NoName__icon-description'}>
                            Growing herbs and veggies for the community
                            with help of permaculture principles.
                        </p>
                    </div>

                    <GardenIcon />
                </div>

                <div className={'NoName__icon-box'}>
                    <RecycleIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Waste solution</h2>

                        <p className={'NoName__icon-description'}>
                            Effective garbage sorting and desposal,
                            compost solutions and 0 waste policy.
                        </p>
                    </div>
                </div>

                <div className={'NoName__icon-box'}>
                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Passive toilets</h2>

                        <p className={'NoName__icon-description'}>
                            Dry compost toilets for the campsite.
                        </p>
                    </div>

                    <ToiletIcon />
                </div>

                <div className={'NoName__icon-box'}>
                    <SolarIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Alternative energy</h2>

                        <p className={'NoName__icon-description'}>
                            A proposed solar energy solution for the campsite
                            and the commonareas.
                        </p>
                    </div>
                </div>

                <div className={'NoName__icon-box'}>
                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Wifi</h2>

                        <p className={'NoName__icon-description'}>
                            High speed internet to stay connected with family and friends.
                        </p>
                    </div>

                    <WifiIcon />
                </div>

                <img
                    className={'NoName__img'}
                    src={VolunteerImg}
                />

                <div className={'NoName__icon-box'}>
                    <ProductiveIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Co-working space</h2>

                        <p className={'NoName__icon-description'}>
                            Creative space with working desks in
                            a calm environment.
                        </p>
                    </div>
                </div>

                <div className={'NoName__icon-box'}>
                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Digital lab</h2>

                        <p className={'NoName__icon-description'}>
                            Membership based facility with production equipment.
                        </p>
                    </div>

                    <DigitalLabIcon />
                </div>

                <div className={'NoName__icon-box'}>
                    <HammerIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Volunteer</h2>

                        <p className={'NoName__icon-description'}>
                            Introductory involvment in building up the community.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}