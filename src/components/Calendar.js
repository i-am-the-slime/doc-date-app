import React from "react";
import { ScrollView } from "react-native";
import { View } from "native-base";
import {
  Appbar,
  Avatar,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Card,
} from "react-native-paper";
import { NewVisit } from "./NewVisits";
import { getVisits } from "../DB";
import { mainCol, theme } from "../styles";

export const Calendar = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const modalContainerStyle = { backgroundColor: "white", padding: 20 };

  const [visits, setVisits] = React.useState([]);

  React.useEffect(() => {
    getVisits(setVisits);
  });

  const newVisitModal = (
    <Provider>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={modalContainerStyle}
        >
          <NewVisit />
        </Modal>
      </Portal>
    </Provider>
  );

  const appbar = (
    <Appbar.Header style={{ backgroundColor: mainCol }}>
      <Appbar.Content title="Kalender" subtitle={"Meine Termine"} />
    </Appbar.Header>
  );

  const content = visits.map((visit) => (
    <Card key={visit.id} style={{ marginBottom: 10 }}>
      <Card.Title
        title={visit.name}
        subtitle="Card Subtitle"
        left={LeftContent}
      />
      <Card.Content>
        <Paragraph>Card content</Paragraph>
      </Card.Content>

      {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
  ));

  return (
    <View>
      {appbar}
      <ScrollView style={{ paddingTop: 12, marginBottom: 70 }}>
        {content}
      </ScrollView>
      {newVisitModal}
    </View>
  );
};

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="folder" theme={theme} />
);