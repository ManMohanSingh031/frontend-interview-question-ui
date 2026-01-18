export interface DemoState {
  count: number;
  name: string;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}

export interface ServerData {
  config: {
    site: {
      name: string;
      description: string;
    };
    navigation: Array<{
      label: string;
      href: string;
    }>;
    features: string[];
  };
}