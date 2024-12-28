import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader);
    
    if (!authHeader) {
      console.log('No authorization header');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('No token in auth header');
      return res.status(401).json({ message: 'No token provided' });
    }

    console.log('Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Token verified:', { userId: decoded.userId, role: decoded.role });
    
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};

export const isAdmin = (req, res, next) => {
  console.log('Checking admin privileges for user:', req.user);
  
  if (!req.user) {
    console.log('No user object in request');
    return res.status(403).json({ message: 'Requires admin privileges - No user found' });
  }
  
  if (req.user.role !== 'admin') {
    console.log('User is not admin:', req.user.role);
    return res.status(403).json({ message: 'Requires admin privileges - Not an admin' });
  }
  
  console.log('Admin check passed');
  next();
};
