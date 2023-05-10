import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const CreateChapterForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createChapter = async () => {
    try {
      const response = await fetch("http://academico3.rj.senac.br/api/Chapter", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });
      const json = await response.json();
      console.log("Chapter created:", json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = () => {
    createChapter();
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
  };

  return (
    <View>
      <TextInput
        placeholder="Nome do Chapter"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Descrição do Chapter"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Confirmar" onPress={handleConfirm} />
      <Button title="Cancelar" onPress={handleCancel} />
    </View>
  );
};

export default CreateChapterForm;