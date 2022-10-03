import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { styles } from './themes/default/default';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function App() {
  const [list, setList] = useState()

  async function fetchData() {
    fetch('https://controle-territorio.herokuapp.com/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json()).then((obj) => {
      let ret = obj.filter((e) => e.Status != "DESATIVADO");
      setList(ret)
    }
    );

  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br')
  }

  return (
    <>
      <StatusBar style="inverted" />
      <View style={styles.top}>
        <Text style={styles.h2}>Controle de territórios</Text>
      </View>
      <View style={{ ...styles.container }}>
        <View>
          {
            list?.length > 0 ?
              <FlatList data={list} keyExtractor={item => `${item.Territorio}_${item.Rodadas}`} renderItem={(e) => {
                if (!e.item.Dirigente) return;

                const car = <Card style={{ margin: 20 }}>
                  <Card.Content>
                    <Title><Text style={{ fontSize: 25 }}>Território: {e.item.Territorio}</Text></Title>
                    <Paragraph>
                      Dia da semana: {e.item.DiaSemana}
                    </Paragraph>
                    <Paragraph>
                      Dirigente: {e.item.Dirigente}
                    </Paragraph>
                    <Paragraph>
                      Grupo: {e.item.Grupo}
                    </Paragraph>
                    <Paragraph>
                      1ª Saída: {formatDate(e.item.Saida_1)}  2ª Saída: {formatDate(e.item.Saida_2)}
                    </Paragraph>
                    <Paragraph>
                      Devolução: {formatDate(e.item.Devolucao)}
                    </Paragraph>
                  </Card.Content>
                  {/*    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                  <Card.Actions>
                    <Paragraph>
                      Status: {e.item.Status}
                    </Paragraph>
                    <View style={styles.fixToText}>
                      <Button title='ver'></Button>
                    </View>

                  </Card.Actions>
                </Card>


                return car;
              }

              } />
              : null
          }
        </View>
      </View>
      <View style={styles.fixToText}>
        <Button title='Obter dados' onPress={() => fetchData()}></Button>
        <Button title='Cadastrar' ></Button>
      </View>
    </>
  );

}








