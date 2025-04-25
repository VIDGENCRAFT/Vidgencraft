import { Router, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models/User';
import { generateToken } from '../middleware/auth';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      username,
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login
router.post('/login', (req: Request, res: Response) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  })(req, res);
});

// Get current user
router.get('/me', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      username: req.user.username,
    },
  });
});

export default router; 