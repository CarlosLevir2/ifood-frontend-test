import React, { useCallback, useEffect, useMemo, useState } from 'react';

import debounce from 'lodash/debounce';
import { useSelector, useDispatch } from 'react-redux';
import { Select, DatePicker, Input, Card, Typography, Spin, InputNumber } from 'antd';

import { getPlaylistsRequest } from '../../store/modules/playlists/actions';
import { StoreState } from '../../store/createStore';
import { FiltersState, Playlist as PlaylistType } from '../../store/modules/playlists/types';

import { Container, PlaylistList, Playlist, Filters, PlaylistContainer, CenteredContainer } from './styles';

interface DynamicFilterState {
  [key: string]: string | number | undefined, offset: number; limit: number
}

const initialFilterState: DynamicFilterState = {
  locale: undefined,
  country: undefined,
  timestamp: undefined,
  limit: 20,
  offset: 0,
}

const { Meta } = Card;
const { Title } = Typography;

const TIME_TO_REFRESH_PAGE_IN_MILLISECONDS = 30000;

const Playlists = () => {
  const dispatch = useDispatch();

  const [filtersState, setFiltersState] = useState<FiltersState>(initialFilterState);
  const [nameFilter, setNameFilter] = useState<string>();

  const handleSetNameFilter = useCallback(
    debounce((value) => setNameFilter(value), 250),
    []);

  const { playlists, filters, fetchPlaylistsStatus } = useSelector((state: StoreState) => state.playlists);

  const filteredPlaylists: PlaylistType[] = useMemo(() => {
    if (!playlists?.playlists) {
      return [];
    }

    if (nameFilter) {
      const filterNameRegex = new RegExp(nameFilter, 'i');
      return playlists.playlists.items.filter((playlist) => playlist.name.match(filterNameRegex));
    }

    return playlists?.playlists.items;
  }, [nameFilter, playlists]);

  const getPlaylists = useCallback(() => {
    dispatch(getPlaylistsRequest({ filters: filtersState }));
  }, [dispatch, filtersState]);

  const handleFilter = useCallback(
    debounce(({ key, value }: { key: string; value?: string }) => setFiltersState((prevState: FiltersState) => ({ ...prevState, [key]: value || initialFilterState[key] })), 250
    ), []);

  useEffect(() => {
    getPlaylists();
  }, [getPlaylists, dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();
    }, TIME_TO_REFRESH_PAGE_IN_MILLISECONDS)

    return () => clearInterval(intervalId);
  }, [])

  const getPlaylistCards = useCallback(() => (
    <PlaylistContainer>
      <Title level={2}>{playlists?.message}</Title>
      <PlaylistList>
        {
          filteredPlaylists.map((playlist) => (
            <Playlist
              key={playlist.id}
            >
              <Card
                hoverable
                style={{ width: '25rem' }}
                cover={<img src={playlist.images[0].url} alt="Playlist" />}
              >
                <Meta title={playlist.name} description={playlist.description} />
              </Card>
            </Playlist>
          ))
        }
      </PlaylistList>
    </PlaylistContainer>
  ), [filteredPlaylists, playlists])

  const getContent = useCallback(() => {
    if (fetchPlaylistsStatus === 'fetching' || fetchPlaylistsStatus === 'notFetched') {
      return (
        <CenteredContainer>
          <Spin size="large" />
        </CenteredContainer>
      );
    }

    if (fetchPlaylistsStatus === 'error') {
      return (
        <CenteredContainer>
          <Title level={3}>Houve um erro ao tentar buscar novas playlists.</Title>
        </CenteredContainer>
      );
    }

    if (filteredPlaylists.length === 0) {
      return (
        <CenteredContainer>
          <Title level={3}>Nenhum resultado encontrado. Tente mudar os filtros de busca.</Title>
        </CenteredContainer>
      );
    }

    return getPlaylistCards();
  }, [fetchPlaylistsStatus, filteredPlaylists.length, getPlaylistCards])

  return (
    <Container>
      <Filters>
        <Title level={4}>Filtros:</Title>
        {filters?.selectFilters.map((filter) => (
          <Select
            key={filter.id}
            placeholder={`Selecione o(a) ${filter.name}`}
            options={filter.values} size="middle"
            allowClear
            onSelect={(value) => handleFilter({ key: filter.id, value: String(value) })}
          />
        ))}
        {filters?.typedFilters.map((filter) => (
          filter.validation.entityType === 'DATE_TIME' ? (
            <DatePicker
              key={filter.id}
              placeholder={`Selecione o(a) ${filter.name}`}
              size="middle"
              allowClear
              format={filter.validation.pattern}
              onChange={(event) => handleFilter({ key: filter.id, value: event?.format() })}
            />
          ) : (
              <InputNumber
                key={filter.id}
                placeholder={`Selecione o(a) ${filter.name}`}
                size="middle"
                onChange={(value) => handleFilter({ key: filter.id, value: String(value) })}
              />
            )))}
        <Input
          placeholder="Busque por uma playlist"
          size="middle"
          allowClear
          onChange={(event) => handleSetNameFilter(event.target.value)}
        />
      </Filters>

      {getContent()}
    </Container>
  );
}

export default Playlists;
