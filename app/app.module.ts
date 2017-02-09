import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { authProviders, routes } from "./routes";
import { AppComponent } from "./app.component";

import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import { TopicService } from './services/topic.service';

import { LoginPageComponent } from "./pages/login/login-page.component";
import { EventsPageComponent } from "./pages/events/events-page.component";
import { EventDetailsPageComponent } from "./pages/event-details/event-details-page.component";

import { EventOverviewComponent } from "./components/event-details/event-overview/event-overview.component";
import { TopicListComponent } from './components/event-details/topic-list/topic-list.component';
import { TopicComponent } from './components/event-details/topic/topic.component';

import { EventListComponent } from "./components/events/event-list/event-list.component";

@NgModule({
    declarations: [
        AppComponent, 
        LoginPageComponent, EventsPageComponent, EventDetailsPageComponent,
        EventOverviewComponent, TopicListComponent, TopicComponent,
        EventListComponent
    ],
    providers: [
        authProviders,
        UserService, EventService, TopicService
    ],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ]
})
export class AppModule { }