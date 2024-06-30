import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import jsonData from './dictionary.json'; // Ensure this path is correct and JSON is well-formed

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null); // Changed initial state to null

  const binarySearch = (words, element) => {
    let low = 0;
    let high = words.length - 1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      let midElement = words[mid];

      if (midElement === element) {
        return midElement;
      }
      if (midElement < element) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return null;
  };

  const extractWordDetails = (wordDetails) => {
    const meanings = [];
    const antonyms = [];
    const synonyms = [];

    if (wordDetails.MEANINGS) {
      if (Array.isArray(wordDetails.MEANINGS)) {
        meanings.push(...wordDetails.MEANINGS);
      } else if (typeof wordDetails.MEANINGS === 'object') {
        Object.values(wordDetails.MEANINGS).forEach((meaning) => {
          if (Array.isArray(meaning)) {
            meanings.push(...meaning);
          }
        });
      }
    }

    if (wordDetails.ANTONYMS && Array.isArray(wordDetails.ANTONYMS)) {
      antonyms.push(...wordDetails.ANTONYMS);
    }

    if (wordDetails.SYNONYMS && Array.isArray(wordDetails.SYNONYMS)) {
      synonyms.push(...wordDetails.SYNONYMS);
    }

    return { meanings, antonyms, synonyms };
  };

  const handleSearch = () => {
    const words = Object.keys(jsonData); // Get all the keys from the JSON data
    const searchTermUpper = searchTerm.trim().toUpperCase();

    if (searchTermUpper === '') {
      setSearchResult(
        <Text style={styles.resultText}>Type and Search Word Meanings.</Text>
      );
    } else {
      const foundWord = binarySearch(words, searchTermUpper);

      if (foundWord === null) {
        setSearchResult(
          <Text style={styles.resultText}>
            No Result. Please Search Another Word Meaning
          </Text>
        );
      } else {
        const wordDetails = jsonData[foundWord];
        const { meanings, antonyms, synonyms } = extractWordDetails(wordDetails);

        const resultJSX = (
          <View>
            <Text style={styles.heading}>{searchTerm.toLowerCase()}</Text>
            <Text style={styles.label}>Meanings: {meanings.join(', ')}</Text>
            <Text style={styles.label}>Antonyms: {antonyms.join(', ')}</Text>
            <Text style={styles.label}>Synonyms: {synonyms.join(', ')}</Text>
          </View>
        );

        setSearchResult(resultJSX);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Word Meaning ~ Dictionary App</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Word Meaning"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
        onSubmitEditing={handleSearch} // Trigger search on submit
      />
      <ScrollView style={styles.resultContainer}>
        {searchResult !== null ? (
          <View style={{ paddingHorizontal: 10 }}>{searchResult}</View>
        ) : (
          <Text style={styles.resultText}>Type and Enter to Search the Word Meanings.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 10,
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default App;
