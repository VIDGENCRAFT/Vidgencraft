import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  const handleLogout = () => {
    try {
      logout();
      toast({
        title: 'Logged out successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error logging out',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box p={8}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box maxW="container.lg" mx="auto" p={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Welcome, {user.username}!</Heading>
          <Button onClick={handleLogout} colorScheme="red" variant="outline">
            Logout
          </Button>
        </HStack>

        <Box p={6} borderWidth={1} borderRadius="lg">
          <VStack spacing={4} align="stretch">
            <Heading size="md">Your Profile</Heading>
            <Text>
              <strong>Email:</strong> {user.email}
            </Text>
            <Text>
              <strong>Username:</strong> {user.username}
            </Text>
          </VStack>
        </Box>

        {/* Add more dashboard content here */}
      </VStack>
    </Box>
  );
} 