import React from "react";
import { aiSuggestionsData, recentActivitiesData, upcomingEventsData} from "../assets/assets";
import { Bell, Calendar, CheckCircle, Clock, DollarSign, MapPin, Plus, Settings, Users } from "lucide-react";


const Dashboard = () => {
  return (
    <section className="py-24 gradient-secondary">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))] border-[rgba(var(--primary),0.2)]">
            Event Dashboard
          </div>

          <h2 className="text-3xl md:text-5xl font-bold">
            Manage Your Events
            <span className="text-gradient block">
              All in One Place
            </span>
          </h2>

          <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto">
            Track progress, manage budgets, coordinate with vendors, and ensure every detail is perfect for your special day.
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
                <div className="pt-0 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[rgba(var(--primary),0.1)] rounded-lg">
                      <Calendar className="h-5 w-5 text-[rgb(var(--primary))]" />
                    </div>

                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        Active Events
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
                <div className="pt-0 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">450</p>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        Total Guests
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
                <div className="pt-0 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">$70K</p>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        Total Budget
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
                <div className="pt-0 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        Vendors Booked
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-semibold leading-none tracking-tight">
                    Upcoming Events
                  </div>
                  <button className="btn-hero inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-9 px-4 py-2">
                    <Plus className="h-4 w-4 mr-2" />
                    New Event
                  </button>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                {upcomingEventsData.map((event, index) => (
                  <div key={index} className="p-4 border border-[rgba(var(--border),0.5)] rounded-lg space-y-3"  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {event.name}
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-[rgb(var(--muted-foreground))] mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {event.date}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {event.venue}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>
                              {event.guests} guests
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all ${
                          event.status === "On Track"
                            ? "border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]" : 
                            "border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]"
                        }`}
                      >
                        {event.status}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Progress</span>
                        <span>
                          ${event.spent.toLocaleString()} / $
                          {event.budget.toLocaleString()}
                        </span>
                      </div>

                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[rgb(var(--secondary))]">
                        <div
                          className="h-full w-full flex-1 bg-[rgb(var(--primary))] transition-all"
                          style={{ width: `${event.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-9 px-4 py-2 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95">
                        View Details
                      </button>

                      <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-9 px-4 py-2 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95">
                        Manage Vendors
                      </button>

                      <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-9 px-4 py-2 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95">
                        Guest List
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Suggestions */}
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold leading-none tracking-tight text-lg">
                  AI Suggestions
                </div>
                <div className="text-sm text-[rgb(var(--muted-foreground))]">
                  Smart recommendations for your events
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                {aiSuggestionsData.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 border border-[rgba(var(--border),0.5)] rounded-lg"
                  >
                    <div className="flex items-start space-x-2">
                      <div
                        className={`h-2 w-2 rounded-full mt-2 ${
                          suggestion.priority === "high"
                            ? "bg-red-500"
                            : suggestion.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>

                      <div>
                        <h4 className="font-semibold text-sm">
                          {suggestion.title}
                        </h4>

                        <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant card-elegant">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold leading-none tracking-tight text-lg">
                  Recent Activity
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                {recentActivitiesData.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`p-1.5 rounded-full ${
                        activity.type === "booking"
                          ? "bg-green-100"
                          : activity.type === "payment"
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : activity.type === "guest"
                          ? "bg-purple-100"
                          : "bg-orange-100"
                      }`}
                    >
                      {activity.type === "booking" && (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      )}
                      {activity.type === "payment" && (
                        <DollarSign className="h-3 w-3 text-blue-600" />
                      )}
                      {activity.type === "guest" && (
                        <Users className="h-3 w-3 text-purple-600" />
                      )}
                      {activity.type === "reminder" && (
                        <Clock className="h-3 w-3 text-orange-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{activity.title}</p>

                      <p className="text-xs text-[rgb(var(--muted-foreground))]">
                        {activity.vendor ||
                          activity.amount ||
                          activity.event ||
                          activity.date}
                      </p>

                      <p className="text-xs text-[rgb(var(--muted-foreground))]">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold leading-none tracking-tight text-lg">
                  Quick Actions
                </div>
              </div>
              <div className="p-6 pt-0 space-y-2">
                <button className="inline-flex items-center rounded-lg text-sm font-medium transition-all duration-300 h-9 px-4 py-2 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Check Notifications
                </button>

                <button className="inline-flex items-center rounded-lg text-sm font-medium transition-all duration-300 h-9 px-4 py-2 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </button>

                <button className="inline-flex items-center rounded-lg text-sm font-medium transition-all duration-300 h-9 px-4 py-2 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
