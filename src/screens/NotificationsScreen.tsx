import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { Card, Divider, Button } from '@/components';
import { Notification, NotificationType } from '@/types';
import * as Notifications from 'expo-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const handleTestNotification = async () => {
    console.log('Testando disparo de notificação...');
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Notificação de Teste',
          body: 'Esta é uma notificação local de demonstração!',
          sound: true,
          priority: 'high',
          vibrate: [0, 250, 250, 250],
          badge: 1,
          data: { type: 'test' },
        },
        trigger: null,
      });
      Alert.alert('Sucesso', 'Notificação disparada com sucesso.');
    } catch (err) {
      console.error('Erro ao disparar notificação:', err);
      Alert.alert('Erro', 'Não foi possível disparar a notificação.');
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <Card containerStyle={[styles.card, item.read ? styles.readCard : {}]} title={item.title}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      {!item.read && <Text style={styles.unread}>Não lida</Text>}
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.header}>Notificações</Text>
      <Button
        title="Testar Notificação"
        onPress={handleTestNotification}
        containerStyle={{ marginBottom: 16 }}
      />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma notificação.</Text>}
      />
    </SafeAreaView>
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
