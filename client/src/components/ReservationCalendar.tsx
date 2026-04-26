import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';

interface ReservationCalendarProps {
  onSlotSelect: (slotId: number, date: string, time: string) => void;
  selectedSlotId?: number;
}

export default function ReservationCalendar({ onSlotSelect, selectedSlotId }: ReservationCalendarProps) {
  const { t, dir } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get available slots for the current month
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];

  const { data: slots = [] } = trpc.reservations.getAvailableSlots.useQuery({
    startDate: startDateStr,
    endDate: endDateStr,
  });

  // Get slots for the selected date
  const { data: daySlots = [] } = trpc.reservations.getSlotsByDate.useQuery(
    { date: selectedDate || '' },
    { enabled: !!selectedDate }
  );

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentDate.toLocaleString(dir === 'rtl' ? 'ar-DZ' : 'fr-FR', {
    month: 'long',
    year: 'numeric',
  });

  const hasSlots = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = date.toISOString().split('T')[0];
    return slots.some(slot => slot.date === dateStr && slot.available > 0);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={`w-full ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h3 className="text-lg font-semibold text-center capitalize">{monthName}</h3>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day.substring(0, 1)}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {days.map((day, index) => (
            <div key={index}>
              {day === null ? (
                <div className="p-2"></div>
              ) : (
                <button
                  onClick={() => handleDateClick(day)}
                  disabled={!hasSlots(day)}
                  className={`w-full p-2 rounded-lg text-sm font-medium transition-colors ${ 
                    isToday(day)
                      ? 'bg-blue-600 text-white'
                      : selectedDate === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                      ? 'bg-gold-500 text-white'
                      : hasSlots(day)
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {selectedDate && daySlots.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {t('reservation.availableSlots')}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {daySlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => onSlotSelect(slot.id, selectedDate, `${slot.startTime}-${slot.endTime}`)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedSlotId === slot.id
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {slot.startTime}
                  <div className="text-xs opacity-75">
                    {slot.available} {t('reservation.available')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDate && daySlots.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            {t('reservation.noSlots')}
          </div>
        )}
      </div>
    </div>
  );
}
