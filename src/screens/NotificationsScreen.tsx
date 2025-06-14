import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Divider } from '@/components';
import { Notification, NotificationType } from '@/types';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Novo produto disponível!',
    message: 'A nova camisa do Brasil já está à venda.',
    type: NotificationType.NEW_PRODUCT,
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Promoção relâmpago!',
    message: 'Descontos em camisas europeias por tempo limitado.',
    type: NotificationType.PRICE_CHANGE,
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Favorito em promoção',
    message: 'Um dos seus produtos favoritos está com desconto.',
    type: NotificationType.FAVORITE_UPDATE,
    read: false,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

export const NotificationsScreen: React.FC = () => {
  const [notifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const renderItem = ({ item }: { item: Notification }) => (
    <Card containerStyle={[styles.card, item.read && styles.readCard]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      {!item.read && <Text style={styles.unread}>Não lida</Text>}
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notificações</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma notificação.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: { borderRadius: 8, padding: 12 },
  readCard: { opacity: 0.6 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  message: { fontSize: 15, marginBottom: 4 },
  date: { fontSize: 13, color: '#888', marginBottom: 4 },
  unread: { color: '#D32F2F', fontWeight: 'bold', fontSize: 13 },
  empty: { textAlign: 'center', color: '#888', marginTop: 32 },
});
