import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { styles } from './themes/default/default';
import { Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment/moment';

export default function App() {
  const [list, setList] = useState()
  
  async function fetchData(status) {
    fetch('https://controle-territorio.herokuapp.com/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json()).then((obj) => {
      let ret = obj.filter((e) => e.Status != "DESATIVADO");

      if (status) {
        ret = obj.filter(e => e.Status == status)
      }
      setList(ret)
    }
    );
  }

  function formatDate(date) {
    return moment(date).format('DD/MM/YYYY')
  }

  return (
    <>
      <StatusBar style="inverted" />
      <View style={{ ...styles.top }}>
        <Text style={styles.h2}>Territórios</Text>
      </View>
      <View style={{ ...styles.container }}>
        <View>
          {
            list?.length > 0 &&
            <FlatList data={list} keyExtractor={item => `${item.Territorio}_${item.Rodadas}`} renderItem={(e) => {
              if (!e.item.Dirigente) return;

              const car = <Card style={{ margin: 15, backgroundColor: "#FFFFFF" }}>
                <Card.Content>
                  <Title>
                    <Text style={{ ...styles.h2, color: "#5b3e84" }}>Território: {e.item.Territorio}</Text>
                    {e.item.Rodadas > 0 && <Text style={{ fontSize: 10 }}> Rodada: {e.item.Rodadas} </Text>}
                  </Title>
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
                    1ª Saída: {formatDate(e.item.Saida_1)}  2ª Saída: {e.item.Saida_2 ? formatDate(e.item.Saida_2) : "Não houve"}
                  </Paragraph>
                  <Paragraph>
                    Devolução: {formatDate(e.item.Devolucao)}
                  </Paragraph>
                  <Paragraph>Status:  <Text style={{ fontWeight: "bold" }}>{e.item.Status}</Text></Paragraph>
                </Card.Content>
                {/*    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}

                <Card.Actions style={{ display: "flex", alignSelf: "center", alignItems: "space-around" }}>
                  <Button disabled={e.item.Status == "OK"} color={"#5b3e84"} title="Receber"></Button>
                </Card.Actions>
              </Card>


              return car;
            }

            } />

          }
        </View>
      </View>
      <View style={styles.fixToText}>
        <Button title='Abertos' color={"#C2A551"} onPress={() => fetchData("ABERTO")}></Button>
        <Button title='Todos' color="#7C63A0" onPress={() => fetchData()}></Button>
        <Button title='Entregue' color={"#AABC4F"} onPress={() => fetchData("OK")}></Button>
      </View>
    </>
  );

}








