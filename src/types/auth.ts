export type UserRole = 'admin' | 'editor' | 'author';

export interface CognitoUserAttributes {
  email?: string;
  'custom:role'?: UserRole;
  'custom:userId'?: string;
  [key: string]: string | undefined;
}

export interface CognitoUser {
  attributes?: CognitoUserAttributes;
  username?: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  username: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthenticatedUser | null;
  isLoading: boolean;
  error: Error | null;
}

export const PORTAL_PATHS = {
  ADMIN: '/admin',
  EDITOR: '/editor',
  AUTHOR: '/author',
} as const;

export const ROLE_PERMISSIONS = {
  admin: [PORTAL_PATHS.ADMIN, PORTAL_PATHS.EDITOR, PORTAL_PATHS.AUTHOR],
  editor: [PORTAL_PATHS.EDITOR, PORTAL_PATHS.AUTHOR],
  author: [PORTAL_PATHS.AUTHOR],
} as const;
