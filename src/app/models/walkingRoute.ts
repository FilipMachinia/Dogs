export interface WalkingRoute {
  id: number;
  name: string;
  locations: [
    {
      altitude: number;
      latitude: number;
      longitude: number;
    }
  ];
}
