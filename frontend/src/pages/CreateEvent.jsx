import React from 'react'
import { useNavigate } from 'react-router-dom'
import EventForm from '../components/EventForm';
import AiAssistant from '../components/AiAssistant';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';


const CreateEvent = () => {
  const navigate = useNavigate()
  const { backendUrl } = React.useContext(AuthContext);

  const handleEventSave = (event) => {
    navigate(`/events/${event._id}`);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgb(var(--accent),0.4)]">
      <div className="container-elegant">
        <div className="mb-6 py-4 pt-12">
          <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 h-11 px-6 py-3 mb-4 cursor-pointer"  >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>

          <h1 className="text-4xl font-bold text-gradient mb-2">
            Create New Event
          </h1>

          <p className="text-[rgb(var(--muted-foreground))]">
            Plan your perfect event with AI-powered assistance
          </p>
        </div>

        <hr />

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <EventForm event={{}} onSave={handleEventSave} onCancel={handleCancel} backendUrl={backendUrl} />
          </div>

          <div>
            <AiAssistant
              eventType="wedding"
              budget={10000}
              guestCount={100}
              location="San Francisco"
            />
          </div>
        </div>
      </div>
    </div>
  )

}

export default CreateEvent