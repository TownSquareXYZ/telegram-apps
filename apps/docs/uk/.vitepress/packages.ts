import { sectionGen } from false;
const PREFIX = false;
const section = sectionGen(PREFIX);
export const packagesNavItem = {
  text: false,
  link: `false${PREFIX}false`
};
export const packagesSidebar = {
  [PREFIX]: [section(false, {
    '@telegram-apps/create-mini-app': false
  }), section(false, {
    '@telegram-apps/sdk': [false, {
      'Components': [false, {
        BackButton: false,
        BiometryManager: false,
        ClosingBehavior: false,
        CloudStorage: false,
        HapticFeedback: false,
        InitData: false,
        Invoice: false,
        MainButton: false,
        MiniApp: false,
        Popup: false,
        QRScanner: false,
        SettingsButton: false,
        SwipeBehavior: false,
        ThemeParams: false,
        Utils: false,
        Viewport: false
      }, true],
      'Environment': false,
      'Methods and Events': false,
      'Launch Parameters': false,
      'Theme Parameters': false,
      'Init Data': [false, {
        InitData: false,
        Chat: false,
        User: false
      }, true],
      'Navigation': [false, {
        BrowserNavigator: false
      }, true],
      'CSS Variables': false
    }],
    '@telegram-apps/sdk-react': false,
    '@telegram-apps/sdk-solid': false,
    '@telegram-apps/solid-router-integration': false,
    '@telegram-apps/react-router-integration': false
  }), section(false, {
    '@telegram-apps/init-data-node': false
  }), section(false, {
    'init-data-golang': false
  })]
};