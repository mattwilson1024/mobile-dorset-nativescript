import { AuthGuard } from "./auth-guard.service";

import { LoginPageComponent } from "./pages/login/login-page.component";
import { EventsPageComponent } from "./pages/events/events-page.component";
import { EventDetailsPageComponent } from "./pages/event-details/event-details-page.component";

export const authProviders = [
  AuthGuard
];

export const routes = [
    { path: "", redirectTo: "/events", pathMatch: "full" },
    { path: "login", component: LoginPageComponent },
    { path: "events", component: EventsPageComponent, canActivate: [AuthGuard] },
    { path: "events/:id", component: EventDetailsPageComponent, canActivate: [AuthGuard] }
];