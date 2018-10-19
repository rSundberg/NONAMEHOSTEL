import React, { Component } from 'react'
import '../shared/css/noname.css'

import FreeIcon from '../shared/media/free_stay.svg'
import DormIcon from '../shared/media/dorm_stay.svg'
import RoomIcon from '../shared/media/room_stay.svg'
import CommunityKitchenIcon from '../shared/media/community_kitchen.svg'
import WorkshopsIcon from '../shared/media/workshops.svg'
import CampfestIcon from '../shared/media/camp_fest.svg'
import KerimIcon from '../shared/media/kerim.svg'
import ArambolIcon from '../shared/media/arambol.svg'
import BanyanIcon from '../shared/media/banyon_tree.svg'
import ToiletIcon from '../shared/media/toilet.svg'
import SolarIcon from '../shared/media/solar_panel.svg'
import WifiIcon from '../shared/media/wifi.svg'
import ProductiveIcon from '../shared/media/productive_space.svg'
import DigitalLabIcon from '../shared/media/digital_lab.svg'

export default class NoName extends Component {
    render() {
        return (
            <div className={'NoName'}>
                <h2 className={'NoName__title'}>
                    A place crafted with love expressions of
                    thousands of travelers.
                </h2>

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
                    <DormIcon style={{ strokeWidth: '10px' }}/>

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Dorm beds</h2>

                        <p className={'NoName__icon-description'}>
                            Single bed with beddings in a shared room.
                        </p>
                    </div>
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

                <div className={'NoName__icon-box'}>
                    <CommunityKitchenIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Community meals</h2>

                        <p className={'NoName__icon-description'}>
                            In house kitchen offers two vegetarian meals on donation.
                        </p>
                    </div>
                </div>

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
                    <CampfestIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Campfest</h2>

                        <p className={'NoName__icon-description'}>
                            Monthly celebration with art, music and workshops.
                        </p>
                    </div>
                </div>

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
                    <ArambolIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Arambol beach</h2>

                        <p className={'NoName__icon-description'}>
                            7KM. Drumcircle, beach shacks and all the animation,
                            reachable by motorbike.
                        </p>
                    </div>
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

                <div className={'NoName__icon-box'}>
                    <ToiletIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Passive toilets</h2>

                        <p className={'NoName__icon-description'}>
                            Dry compost toilets for the campsite.
                        </p>
                    </div>
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
                    <WifiIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Wifi</h2>

                        <p className={'NoName__icon-description'}>
                            High speed internet to stay connected with family and friends.
                        </p>
                    </div>
                </div>

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
                    <DigitalLabIcon />

                    <div className={'NoName__icon-text'}>
                        <h2 className={'NoName__icon-title'}>Digital lab</h2>

                        <p className={'NoName__icon-description'}>
                            Membership based facility with production equipment.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}