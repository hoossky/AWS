import React, {useState, useEffect} from 'react';
import {MDBRow, MDBCol} from 'mdbreact';
import Geocode from 'react-geocode';
import {GoogleMap, useLoadScript, Marker, InfoWindow, Polyline} from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox';
import haversine from '../../assets/img/haversine.jpg'
import './Map/Search.css';
import '@reach/combobox/styles.css';
import mapStyles from './Map/mapStyles';
import axios from 'axios';

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

const CustomerInfo = ({match}) => {
	const [searchMarker, setSearchMarker] = useState(false);
	const [searchSelected, setSearchSelected] = useState({lat: '', lng: ''});
	const [searchedAddr, setSearchedAddr] = useState('');
	const [infoShow, setInfoShow] = useState(false);
	const [selectedAddr, setSelectedAddr] = useState('');
	const [selected, setSelected] = useState({lat: '', lng: ''});
	const [post, setPost] = useState({});
	const [centeredCoor, setCenteredCoor] = useState({lat: '', lng: ''});
	const [movingToCoor, setMovingToCoor] = useState({lat: '', lng: ''});
	const [polyShow, setPolyShow] = useState(false);
	useEffect(() => {
		axios
			.get(`http://ip/orders/findUser/${match.params.orderId}`)
			.then(res => {
				Geocode.fromAddress(res.data.movingFrom).then(
					response => {
						const movingFrom = response.results[0].geometry.location;
						setCenteredCoor(movingFrom);
					},
					error => {
						console.error(error);
					},
				);
				Geocode.fromAddress(res.data.movingTo).then(
					response => {
						const movingTo = response.results[0].geometry.location;
						setMovingToCoor(movingTo);
					},
					error => {
						console.error(error);
					},
				);
				setPost(res.data);
			})
			.catch(err => {
				throw err;
			});
	}, []);
	const locations = [
		{
			name: `${post.movingName}님 출발지`,
			location: {
				lat: centeredCoor.lat,
				lng: centeredCoor.lng,
			},
		},
	];
	const destinations = [
		{
			name: `${post.movingName}님 도착지`,
			arrival: {
				lat: movingToCoor.lat,
				lng: movingToCoor.lng,
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
	const onSelect2 = info => {
		setDestinationSelected(info);
	};
	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: 'AIzaSyCrQuKKwt0DtPF8vxKPx6dRq3us6me2LO8',
		libraries,
	});
	const [markers, setMarkers] = React.useState([]);

	const [initialSelected, setInitialSelected] = useState({});
	const [destinationSelected, setDestinationSelected] = useState({});

	const onMapClick = React.useCallback(e => {
		setMarkers(current => [
			...current,
			{
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
			},
		]);
	}, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

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
	// 호에서의 거리
	function haversine_distance() {
		const R = 6371.071; // Radius of the Earth in km
		const rlat1 = centeredCoor.lat * (Math.PI / 180); // Convert degrees to radians
		const rlat2 = movingToCoor.lat * (Math.PI / 180); // Convert degrees to radians
		const difflat = rlat2 - rlat1; // Radian difference (latitudes)
		const difflon = (movingToCoor.lng - centeredCoor.lng) * (Math.PI / 180); // Radian difference (longitudes)
		const d =
			2 *
			R *
			Math.asin(
				Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)),
			);
		return d;
	}
	const distance = haversine_distance();
	const midPoint = {lat: (centeredCoor.lat + movingToCoor.lat) / 2, lng: (centeredCoor.lng + movingToCoor.lng) / 2};
	return (
		<>
			<div>
				<form className='needs-validation' noValidate style={{padding: '4rem', margin: '0 auto', maxWidth: 800}}>
					<MDBRow>
						<MDBCol md='8' className='mb-3'>
							<h2> {post.movingName}님 회원정보</h2>
							<label htmlFor='defaultFormRegisterNameEx'>이름</label>
							<input name='fname' type='text' id='defaultFormRegisterNameEx' className='form-control' required value={post.movingName} />
							<label htmlFor='defaultFormRegisterNameEx'>전화번호</label>
							<input name='fname' type='text' id='defaultFormRegisterNameEx' className='form-control' required value={post.movingPhone} />
							<label htmlFor='defaultFormRegisterNameEx'>이사 희망 날짜</label>
							<input name='fname' type='text' id='defaultFormRegisterNameEx' className='form-control' required value={post.movingDate} />
							<label htmlFor='defaultFormRegisterNameEx'>출발지</label>
							<input name='fname' type='text' id='defaultFormRegisterNameEx' className='form-control' required value={post.movingFrom} />
							<label htmlFor='defaultFormRegisterNameEx'>도착지</label>
							<input name='fname' type='text' id='defaultFormRegisterNameEx' className='form-control' required value={post.movingTo} />

							<br />
							<br />
							<div>
								<h3>
									두 지점 사이의 거리<p style={{color: 'red'}}> {distance.toFixed()} km</p>
								</h3>
								<p>(거리는 하버사인 공식을 이용하여 계산하였습니다.)</p>
								<img src={haversine} />
							</div>
							<h3>두 거리 간 예상 이사 배달 비용 </h3>
							<h3 style={{color: 'red'}}>{distance.toFixed() * 0.2} 만원(km당 2천원)</h3>

							<Locate panTo={panTo} />
							<Search panTo={panTo} setPosition={setSearchSelected} setMarkerShow={setSearchMarker} setSearchedAddr={setSearchedAddr} />
							<GoogleMap
								id='map'
								mapContainerStyle={mapContainerStyle}
								zoom={12}
								center={centeredCoor}
								options={options}
								onClick={onMapClick}
								onLoad={onMapLoad}
							>
								{searchMarker && (
									<Marker
										position={searchSelected}
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
									<InfoWindow position={initialSelected.location} clickable={true} onCloseClick={() => setInitialSelected({})}>
										<h5>
											{initialSelected.name} : {post.movingFrom}
										</h5>
									</InfoWindow>
								)}
								{destinations.map(info => {
									return (
										<Marker
											key={info.name}
											position={info.arrival}
											onClick={() => onSelect2(info)}
											icon={{
												url: `/movingCar.png`,
												origin: new window.google.maps.Point(0, 0),
												anchor: new window.google.maps.Point(15, 15),
												scaledSize: new window.google.maps.Size(30, 30),
											}}
										/>
									);
								})}
								{destinationSelected.arrival && (
									<InfoWindow position={destinationSelected.arrival} clickable={true} onCloseClick={() => setDestinationSelected({})}>
										<h5>
											{destinationSelected.name} : {post.movingTo}
										</h5>
									</InfoWindow>
								)}
								{markers.map(marker => (
									<Marker
										key={`${marker.lat}-${marker.lng}`}
										position={{
											lat: marker.lat,
											lng: marker.lng,
										}}
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
										position={{
											lat: selected.lat,
											lng: selected.lng,
										}}
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
											<p> {selectedAddr} </p>
										</div>
									</InfoWindow>
								) : null}
								<Polyline
									path={[movingToCoor, centeredCoor]}
									visible={true}
									options={{
										strokeColor: '#096BF2 ',
										strokeOpacity: 1,
										strokeWeight: 3,
										icons: [{icon: {path: window.google.maps.SymbolPath.DEFAULT}, offset: '0', repeat: '40px'}],
									}}
									onClick={() => {
										setPolyShow(true);
									}}
								/>
								{polyShow ? (
									<InfoWindow
										position={midPoint}
										onCloseClick={() => {
											setPolyShow(false);
										}}
									>
										<h2>두 지점 사이의 거리<p style={{color: 'red'}}> {distance.toFixed()} km</p></h2>
									</InfoWindow>
								) : null}
							</GoogleMap>
						</MDBCol>
					</MDBRow>
				</form>
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
function Search({panTo, setPosition, setMarkerShow, setSearchedAddr}) {
	const {
		ready,
		value,
		suggestions: {status, data},
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: {lat: () => 37.5717975, lng: () => 126.9325254}, // 검색할때의 이 지점에서부터 찾는?
			radius: 200 * 1000,
		},
	});
	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

	const handleInput = e => {
		// Update the keyword of the input element
		setValue(e.target.value);
	};

	const handleSelect = async address => {
		// When user selects a place, we can replace the keyword without request data from API
		// by setting the second parameter as "false"
		setValue(address, false);
		clearSuggestions();

		try {
			const results = await getGeocode({address});
			const {lat, lng} = await getLatLng(results[0]);
			panTo({lat, lng});

			setPosition({lat, lng});
			setMarkerShow(true);
			setSearchedAddr(address);
		} catch (error) {
			console.log('😱 Error: ', error);
		}
	};

	return (
		<div className='search'>
			<Combobox onSelect={handleSelect}>
				<ComboboxInput value={value} onChange={handleInput} disabled={!ready} placeholder='Search your location' />
				<ComboboxPopover>
					<ComboboxList>{status === 'OK' && data.map(({id, description}) => <ComboboxOption key={id} value={description} />)}</ComboboxList>
				</ComboboxPopover>
			</Combobox>
		</div>
	);
}
export default CustomerInfo;
