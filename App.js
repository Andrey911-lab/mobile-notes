import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addNote = () => {
        if (title.trim() === '' || content.trim() === '') return;
        const newNote = {
            id: Date.now(),
            title: title,
            content: content,
        };
        setNotes([...notes, newNote]);
        setTitle('');
        setContent('');
    };

    const renderNote = ({ item }) => (
        <View>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
        </View>
    );

    return (
        <View>
            <Text>Мои заметки</Text>

            <TextInput
                placeholder="Заголовок"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                placeholder="Текст заметки"
                value={content}
                onChangeText={setContent}
                multiline
            />

            <Button title="Добавить заметку" onPress={addNote} />

            {notes.length === 0 ? (
                <Text>Нет заметок</Text>
            ) : (
                <FlatList
                    data={notes}
                    renderItem={renderNote}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}