import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        loadNotes();
    }, []);

    useEffect(() => {
        saveNotes();
    }, [notes]);

    const loadNotes = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes !== null) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    };

    const saveNotes = async () => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(notes));
        } catch (error) {
            console.error('Ошибка сохранения:', error);
        }
    };

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

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const renderNote = ({ item }) => (
        <View style={styles.noteItem}>
            <View style={styles.noteContent}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteText}>{item.content}</Text>
            </View>
            <Button title="Удалить" onPress={() => deleteNote(item.id)} color="#ff6b6b" />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 12,
        marginTop: 12,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    noteContent: {
        flex: 1,
        marginRight: 12,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    noteText: {
        fontSize: 14,
        color: '#666',
    },
});