import { mockUsers, mockHageresibket } from '../data/mockData';

class AuthService {
  async login(credentials, loginType) {
    const { username, password } = credentials;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      let user = null;
      let userType = null;
      let token = null;
      let permissions = [];

      if (loginType === 'hageresibket') {
        // Hageresibket login
        const hageresibket = mockHageresibket.find(
          h => h.superAdminUsername === username && h.superAdminPassword === password
        );

        if (hageresibket) {
          user = hageresibket;
          userType = 'super_admin';
          token = `hageresibket_${Date.now()}`;
          permissions = this.getSuperAdminPermissions();
        } else {
          throw new Error('Invalid credentials for Hageresibket login');
        }
      } else {
        // WeredaBetekihinet login
        const foundUser = mockUsers.find(
          u => u.username === username && u.password === password
        );

        if (foundUser) {
          user = foundUser;
          userType = foundUser.role;
          token = `wereda_${Date.now()}`;
          permissions = this.getUserPermissions(foundUser);
        } else {
          throw new Error('Invalid credentials for Wereda login');
        }
      }

      return {
        success: true,
        data: {
          user,
          userType,
          token,
          permissions,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async logout() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }

  getUserType(user) {
    if (user.superAdminUsername) return 'super_admin';
    return user.role || 'wereda_admin';
  }

  getUserPermissions(user) {
    const rolePermissions = {
      super_admin: this.getSuperAdminPermissions(),
      Admin: [
        'manage_believers',
        'manage_atbiya',
        'manage_baptisms',
        'manage_marriages',
        'manage_deaths',
        'view_statistics',
        'generate_certificates',
        'manage_users',
      ],
      wereda_admin: [
        'manage_believers',
        'manage_atbiya',
        'manage_baptisms',
        'manage_marriages',
        'manage_deaths',
        'view_statistics',
        'generate_certificates',
      ],
    };

    return rolePermissions[user.role] || [];
  }

  getSuperAdminPermissions() {
    return [
      'manage_wereda',
      'manage_users',
      'view_all_data',
      'system_settings',
      'generate_reports',
      'manage_permissions',
      'audit_logs',
      'backup_restore',
    ];
  }

  async refreshToken(token) {
    // Simulate token refresh
    await new Promise(resolve => setTimeout(resolve, 500));
    return `${token}_refreshed_${Date.now()}`;
  }

  async validateToken(token) {
    // Simulate token validation
    await new Promise(resolve => setTimeout(resolve, 300));
    return token && token.includes('_');
  }
}

export const authService = new AuthService();