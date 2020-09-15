
import React, {useEffect, useState} from 'react';

import Geocode from 'react-geocode';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {Combobox,ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox';
import axios from 'axios';

import '../CompanyPage/Map/Search.css';
import '@reach/combobox/styles.css';

import mapStyles from '../CompanyPage/Map/mapStyles';
import {SideBar} from '../../commons';
import FittedImage from "react-fitted-image";

Geocode.setApiKey('AIzaSyCrQuKKwt0DtPF8vxKPx6dRq3us6me2LO8');
Geocode.setLanguage('ko');
const libraries = ['places'];
const mapContainerStyle = {
	height: '55vh',
	width: '45vw',
};
const options = {
	styles: mapStyles,
};


const UserInfo = ({match}) => {
	const [searchMarker, setSearchMarker] = useState(false);
	const [searchSelected, setSearchSelected] = useState({lat: '', lng: ''});
	const [infoShow, setInfoShow] = useState(false);
	const [selectedAddr, setSelectedAddr] = useState('');
	const [selected, setSelected] = useState({lat: '', lng: ''});
	const [userInfo, setUserInfo] = useState({});
	const [title, setTitle] = useState('');
	const [writer, setWriter] = useState('');
	const [address, setAddress] = useState('');
	const [contents, setContents] = useState('');
	const [regDate, setRegDate] = useState('');
	const [userLocation, setUserLocation] = useState({lat: '', lng: ''});
	const [searchedAddr, setSearchedAddr] = useState('');

	const [show, setShow] = useState(false);
	const handleDelete = e => {
		e.preventDefault();
		axios
			.delete(`http://ip/articles/delete/${match.params.articleId}`)
			.then(res => {
				window.location.href = '/market';
			})
			.catch(error => {
				throw error;
			});
	};
	const modify = e => {
		setShow(true);
	};
	const handleModify = e => {
		e.preventDefault();
		const userJson = {
			title: title,
			writer: writer,
			address: address,
			contents: contents,
		};
		axios
			.patch(`http://ip/articles/update/${match.params.articleId}`, userJson)
			.then(response => {
				alert('수정 완료');
				window.location.href = `/userInfo/${match.params.articleId}`;
			})
			.catch(error => {
				throw error;
			});
	};

	const textStyle = {
		backgroundColor: 'white',
	};
	const [imageUrl, setImageUrl] = useState('')
	useEffect(() => {
		axios
			.get(`http://ip/articles/findUser/${match.params.articleId}`)
			.then(res => {
				sessionStorage.setItem('ArticleData', JSON.stringify(res.data));
				setTitle(res.data.title);
				setWriter(res.data.writer);
				setAddress(res.data.address);
				setRegDate(res.data.regDate);
				setImageUrl(JSON.parse(sessionStorage.getItem("url")))
				Geocode.fromAddress(res.data.address)
					.then(response => {
						const userAddress = response.results[0].geometry.location;
						setUserLocation(userAddress);
					})
					.catch(error => {
						throw error;
					});
				setContents(res.data.contents);
				setUserInfo(res.data);
			})
			.catch(error => {
				throw error;
			});
	}, []);
	const locations = [
		{
			name: `${writer}님 중고거래 희망위치`,
			location: {
				lat: userLocation.lat,
				lng: userLocation.lng,
			},
		},
	];

	Geocode.fromLatLng(selected.lat, selected.lng).then(
		response => {
			const address = response.results[0].formatted_address;
			setSelectedAddr(address);
		},
		error => {
			console.error(error);
		},
	);
	const onSelect = item => {
		setInitialSelected(item);
	};
	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: 'AIzaSyCrQuKKwt0DtPF8vxKPx6dRq3us6me2LO8',
		libraries,
	});
	const [markers, setMarkers] = React.useState([]);

	const [initialSelected, setInitialSelected] = useState({});

	const onMapClick = React.useCallback(e => {
		setMarkers(current => [
			...current,
			{
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback(map => {
		mapRef.current = map;
	}, []);

	const panTo = React.useCallback(({lat, lng}) => {
		//<Search panTo <- 여기로
		mapRef.current.panTo({lat, lng});
		mapRef.current.setZoom(14);
	}, []);
	if (loadError) return 'Error';
	if (!isLoaded) return 'Loading...';
	return (
		<>
			<SideBar />
			<div id='wrapper'>
				<div id='page-wrapper'>
					<div className='row'>
						<div className='col-lg-12'>
							<br />
							<h2>{title}</h2>
							<br />
						</div>
					</div>
					<div className='row'>
						<div className='col-lg-12'>
							<div className='panel panel-default'>
								<div className='panel-body'>
									<table width='100%' className='table  table-bordered ' id='dataTables-example'>
										<thead>
										<tr>
											<th>
												<h4>희망 거래 장소</h4> {address}
											</th>
										</tr>
										<th>글쓴이: {writer}</th>
										<tr>
											<th> 작성일: {regDate}</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											{!show && <textarea readOnly={true} style={textStyle} className='form-control' name='contents' rows={14} value={contents} />}
											{show && (
												<textarea className='form-control' name='contents' rows={14} value={contents} onChange={e => setContents(e.target.value)} />

											)}
											<br/>
											<h1>{writer}님이 올리신 물건 사진</h1>
											<FittedImage fit="contain" src={imageUrl} alt="#"/>
										</tr>
										​
										<Locate panTo={panTo} />
										​
										<GoogleMap
											id='map'
											mapContainerStyle={mapContainerStyle}
											zoom={16}
											center={userLocation}
											options={options}
											onClick={onMapClick}
											onLoad={onMapLoad}
										>
											{searchMarker && (
												<Marker
													position={searchSelected}
													onClick={() => searchSelected}
													icon={{
														url: `/movingCar.png`,
														origin: new window.google.maps.Point(0, 0),
														anchor: new window.google.maps.Point(15, 15),
														scaledSize: new window.google.maps.Size(30, 30),
													}}
												>
													<InfoWindow>
														<h5>{searchedAddr}</h5>
													</InfoWindow>
												</Marker>
											)}
											​
											{locations.map(item => {
												return (
													<Marker
														key={item.name}
														position={item.location}
														onClick={() => onSelect(item)}
														icon={{
															url: `/home.svg`,
															origin: new window.google.maps.Point(0, 0),
															anchor: new window.google.maps.Point(20, 20),
															scaledSize: new window.google.maps.Size(40, 40),
														}}
													/>
												);
											})}
											{initialSelected.location && (
												<InfoWindow position={initialSelected.location} onCloseClick={() => setInitialSelected({})}>
													<div>
														<h5>{initialSelected.name}</h5>
														<p> {address}</p>
													</div>
												</InfoWindow>
											)}
											​
											{markers.map(marker => (
												<Marker
													key={`${marker.lat}-${marker.lng}`}
													position={{lat: marker.lat, lng: marker.lng}}
													onClick={() => {
														setSelected(marker);
														setInfoShow(true);
													}}
													icon={{
														url: `/movingCar.png`,
														origin: new window.google.maps.Point(0, 0),
														anchor: new window.google.maps.Point(15, 15),
														scaledSize: new window.google.maps.Size(30, 30),
													}}
												/>
											))}
											{infoShow ? (
												<InfoWindow
													position={{lat: selected.lat, lng: selected.lng}}
													onCloseClick={() => {
														setInfoShow(false);
													}}
												>
													<div>
														<h4>
																<span role='img' aria-label='bear'>
																	주소
																</span>
														</h4>
														<p>{selectedAddr} </p>
													</div>
												</InfoWindow>
											) : null}
										</GoogleMap>
										</tbody>
									</table>
									{sessionStorage.userData &&
									(JSON.parse(sessionStorage.userData).userId === writer ? (
										<div>
											<button type='submit' className='btn btn-info' value={show} onClick={modify}>
												수정하기
											</button>
											{show && (
												<button type='submit' className='btn btn-info' onClick={handleModify}>
													수정완료
												</button>
											)}
											​
											<button type='submit' className='btn btn-info' onClick={handleDelete}>
												삭제하기
											</button>
										</div>
									) : null)}
								</div>
								{/* /.panel-body */}
							</div>
							{/* /.panel */}
						</div>
						{/* /.col-lg-12 */}
					</div>
				</div>
				{/* /#page-wrapper */}
			</div>
		</>
	);
};
function Locate({panTo}) {
	return (
		<button
			className='locate'
			onClick={e => {
				e.preventDefault();
				navigator.geolocation.getCurrentPosition(
					position => {
						panTo({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
					},
					() => null,
				);
			}}
		>
			<img src='/compass.svg' alt='compass' />
		</button>
	);
}

export default UserInfo;