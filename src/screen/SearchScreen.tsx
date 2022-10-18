import React, { useEffect, useState } from 'react'
import { View, Platform, Text, FlatList, Dimensions } from 'react-native';

import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { styles } from '../theme/appTheme';
import { usePokemonSearch } from '../hooks/usePokemonSaerch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;


export const SearchScreen = () => {

  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) return setPokemonFiltered([]);

    if (isNaN(Number(term))) {
      return setPokemonFiltered(
        simplePokemonList.filter
          (poke => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
      );
    }

    const pokemonById = simplePokemonList.find(poke => poke.id === term);
    setPokemonFiltered(
      (pokemonById) ? [pokemonById] : []
    );

  }, [term])


  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{
      flex: 1,
      marginHorizontal: 20
    }}>
      <SearchInput
        onDebounce={(value) => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: (Platform.OS === 'ios') ? top : top + 20
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={(pokemon) => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}

        ListHeaderComponent={(
          <Text style={{
            ...styles.title,
            ...styles.globalMargin,
            paddingBottom: 10,
            marginTop: (Platform.OS === 'ios') ? top + 60 : top + 80
          }}>{term}</Text>
        )}

        renderItem={({ item }) => <PokemonCard pokemon={item} />}

      />

    </View>
  )
}


