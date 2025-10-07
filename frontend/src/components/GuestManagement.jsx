import { Edit, Mail, Phone, Trash2, UserPlus, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { guestsData } from '../assets/assets';

const GuestManagement = ({ eventId }) => {

  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);

  const [guestForm, setGuestForm] = useState({
    name: "",
    email: "",
    phone: "",
    rsvp_status: "pending",
    plus_one: false,
    dietary_restrictions: ""
  });

  const fetchGuests = async () => {
    try {
      setGuests(guestsData)
    } catch (error) {
        toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleEdit = (guest) => {
    setEditingGuest(guest);
    setGuestForm({
      name: guest.name,
      email: guest.email || "",
      phone: guest.phone || "",
      rsvp_status: guest.rsvp_status,
      plus_one: guest.plus_one,
      dietary_restrictions: guest.dietary_restrictions || ""
    });
    setShowAddDialog(true);
  };

  const handleDelete = async (guestId) => {
    const confirmed = window.confirm("Are you sure you want to remove this guest?");
    if (!confirmed) 
      return;

    try {
      
    } catch (error) {
      toast.error(error.message)
    }
  };


  const totalGuests = guests.reduce((sum, guest) => sum + (guest.plus_one ? 2 : 1), 0);
  const confirmedGuests = guests.filter(g => g.rsvp_status === "confirmed").reduce((sum, guest) => sum + (guest.plus_one ? 2 : 1), 0);

  useEffect(() => {
    fetchGuests();
  }, [eventId]);

  if (loading) {
    return (
      <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
        <div className="p-6 pt-0 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--primary))] mx-auto mb-4"></div>
          <p className="text-[rgb(var(--muted-foreground))]">Loading guests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-md">
        <div className='flex flex-col space-y-1.5 p-6'>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                <Users className="h-5 w-5 text-[rgb(var(--primary))]" />
                Guest List ({guests.length} guests)
              </div>
              <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                Manage your event guests and track RSVPs
              </div>
            </div>
            
            <div className="p-6">
              <button onClick={() => setShowAddDialog(true)}  className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-9 px-5 cursor-pointer" >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Guest
              </button>

              {
                showAddDialog && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                      <h2 className="text-lg font-semibold mb-2">
                        {editingGuest ? "Edit Guest" : "Add New Guest"}
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        {editingGuest ? "Update guest information" : "Add a new guest to your event"}
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className='text-sm font-medium leading-none'>
                            Name *
                          </label>

                          <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                            id="name"
                            value={guestForm.name}
                            onChange={(e) => setGuestForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Guest name"
                            required
                          />
                        </div>
                  
                        <div className="space-y-2">
                          <label htmlFor="email" className='text-sm font-medium leading-none'>
                            Email
                          </label>

                          <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                            id="email"
                            type="email"
                            value={guestForm.email}
                            onChange={(e) => setGuestForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Guest email"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="phone" className='text-sm font-medium leading-none'>Phone</label>
                          <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                            id="phone"
                            value={guestForm.phone}
                            onChange={(e) => setGuestForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Guest phone number"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="rsvp_status" className='text-sm font-medium leading-none'>RSVP Status</label>

                          <select className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                            value={guestForm.rsvp_status}
                            onChange={(e) => setGuestForm(prev => ({ ...prev, rsvp_status: e.target.value }))}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="declined">Declined</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="mt-1 flex items-center">
                            <input type="checkbox" checked={guestForm.plus_one} onChange={(e) => setGuestForm((prev) => ({ ...prev, plus_one: e.target.checked })) } id='plus_one' className='cursor-pointer' />

                            <label htmlFor="plus_one" className='text-sm font-medium leading-none cursor-pointer ml-2'>
                              Plus One
                            </label>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="dietary_restrictions" className='text-sm font-medium leading-none'>
                            Dietary Restrictions
                          </label>

                          <textarea className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                            id="dietary_restrictions"
                            value={guestForm.dietary_restrictions}
                            onChange={(e) => setGuestForm(prev => ({ ...prev, dietary_restrictions: e.target.value }))}
                            placeholder="Any dietary restrictions or notes"
                            rows={2}
                          />
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-[rgb(var(--background))] transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 flex-1 cursor-pointer h-9 px-6">
                            {editingGuest ? "Update" : "Add"} Guest
                          </button>

                          <button type="button" className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-[rgb(var(--background))] transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 cursor-pointer h-9 px-6' onClick={() => {
                              setShowAddDialog(false);
                              setEditingGuest(null);
                              setGuestForm({
                                name: "",
                                email: "",
                                phone: "",
                                rsvp_status: "pending",
                                plus_one: false,
                                dietary_restrictions: ""
                              });
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <div className='p-6 pt-0'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-[rgba(var(--primary),0.1)] rounded-lg">
              <div className="text-2xl font-bold text-[rgb(var(--primary))]">
                {guests.length}
              </div>
              <div className="text-sm text-[rgb(var(--muted-foreground))]">
                Total Invited
              </div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{confirmedGuests}</div>
              <div className="text-sm text-[rgb(var(--muted-foreground))]">Confirmed</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalGuests}</div>
              <div className="text-sm text-[rgb(var(--muted-foreground))]">Expected Total</div>
            </div>
          </div>

          {guests.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />

              <p className="text-[rgb(var(--muted-foreground))]">
                No guests added yet.
              </p>

              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Click "Add Guest" to start building your guest list.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {guests.map((guest) => (
                <div key={guest.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-[rgba(var(--accent),0.3)] transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">
                        {guest.name}
                      </h4>

                      <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${guest.rsvp_status.toLowerCase() === 'confirmed' ? 'border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]' : guest.rsvp_status.toLowerCase() === 'declined' ?'border-transparent bg-[rgb(var(--destructive))] text-[rgb(var(--destructive-foreground))] hover:bg-[rgba(var(--destructive),0.8)]' : guest.rsvp_status.toLowerCase() === 'pending' ? 'border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]' : 'border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'}`}>
                        {guest.rsvp_status}
                      </div>

                      {
                        guest.plus_one && (
                          <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-[rgb(var(--foreground))]'>
                            +1
                          </div>
                        )
                      }
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-[rgb(var(--muted-foreground))]">
                      {
                        guest.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {guest.email}
                          </div>
                        )
                      }

                      {
                        guest.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {guest.phone}
                          </div>
                        )
                      }
                    </div>
                    
                    {
                      guest.dietary_restrictions && (
                        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                          <strong>Dietary:</strong> {guest.dietary_restrictions}
                        </p>
                      )
                    }
                  </div>
                  
                  <div className="flex gap-2">
                    <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 h-9 px-4 py-2 cursor-pointer' onClick={() => handleEdit(guest)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 h-9 px-4 py-2 cursor-pointer' onClick={() => handleDelete(guest.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GuestManagement