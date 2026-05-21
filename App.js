import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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
                notes.map(note => (
                    <View key={note.id}>
                        <Text>{note.title}</Text>
                        <Text>{note.content}</Text>
                    </View>
                ))
            )}
        </View>
    );
}