import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

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
        <View style={styles.noteItem}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent}>{item.content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Мои заметки</Text>

            <TextInput
                style={styles.input}
                placeholder="Заголовок"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Текст заметки"
                value={content}
                onChangeText={setContent}
                multiline
            />

            <Button title="Добавить заметку" onPress={addNote} />

            {notes.length === 0 ? (
                <Text style={styles.emptyText}>Нет заметок</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 40,
        fontSize: 16,
    },
    noteItem: {
        borderWidth: 1,
        borderColor: '#eee',
        padding: 12,
        marginTop: 12,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    noteContent: {
        fontSize: 14,
        color: '#666',
    },
});