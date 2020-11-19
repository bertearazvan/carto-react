import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { geocodeStreetPoint } from './models';

import { selectOAuthCredentials } from '../redux/oauthSlice';
import { addLayer, setGeocoderResult, setViewState } from '../redux/cartoSlice';

import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_COUNTRY = ''; // 'SPAIN', 'USA'

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: theme.palette.common.white,
  },
}));

export default function GeocoderWidget(props) {
  const oauthCredentials = useSelector(selectOAuthCredentials);
  const globalCredentials = useSelector((state) => state.carto.credentials);
  const credentials = oauthCredentials || globalCredentials;
  // Component local state and events handling
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  // Actions dispatched
  const dispatch = useDispatch();

  useEffect(() => {
    // layer to display the geocoded direction marker
    dispatch(
      addLayer({
        id: 'geocoderLayer',
      })
    );
  }, [dispatch]);

  const classes = useStyles();

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInput = (e) => {
    if (e.target.value === '') {
      updateMarker(null);
    }
  };

  const handleKeyPress = async (e) => {
    if (credentials && e.keyCode === 13) {
      try {
        setLoading(true);
        const result = await geocodeStreetPoint(credentials, {
          searchText,
          country: DEFAULT_COUNTRY,
        });
        if (result) {
          zoomToResult(result);
          updateMarker(result);
        }
      } catch (e) {
        handleGeocodeError(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const zoomToResult = (result) => {
    dispatch(
      setViewState({
        longitude: result.longitude,
        latitude: result.latitude,
        zoom: 16,
        transitionDuration: 500,
      })
    );
  };

  const updateMarker = (result) => {
    dispatch(setGeocoderResult(result));
  };

  const handleGeocodeError = (error) => {
    if (props.onError) {
      props.onError(error);
    }
  };

  return (
    <TextField
      className={props.className}
      style={{
        width: 262,
      }}
      InputProps={{
        className: classes.input,
        placeholder: 'Search address',
        startAdornment: (
          <InputAdornment>
            {loading ? <CircularProgress /> : <SearchIcon />}
          </InputAdornment>
        ),
      }}
      size='small'
      value={searchText}
      onChange={handleChange}
      onInput={handleInput}
      onKeyDown={handleKeyPress}
    />
  );
}