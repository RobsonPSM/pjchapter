import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';

interface Data {
  id: number;
  nome : string;
  descricao : string;
}

const App = () => {
  const [data, setData] = useState<Data[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://academico3.rj.senac.br/api/Chapter');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCreateChapterPress = () => {
    navigation.navigate('createChapter');
  };

  const handleDeleteChapterPress = async (id: number) => {
    try {
      const response = await fetch(`http://academico3.rj.senac.br/api/Chapter/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {data.map((chapter) => (
          <Card key={chapter.id} style={styles.card}>
            <Card.Title title={chapter.nome} />
            <Card.Content>
              <Text>{chapter.descricao}</Text>
            </Card.Content>
            <Card.Actions>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteChapterPress(chapter.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleCreateChapterPress}>
          <Text style={styles.buttonText}>Criar Chapter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default App;