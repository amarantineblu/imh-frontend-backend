import { Calendar, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const DateTimeDisplay = ({
  format = 'default',
  showIcon = false,
  className = '',
  timeZone = 'Africa/Lagos', // Default to Nigerian timezone
  showSeconds = false,
  animate = false,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Update immediately on mount
    setCurrentDateTime(new Date());

    const timer = setInterval(() => {
      if (animate) {
        setIsUpdating(true);
        setTimeout(() => setIsUpdating(false), 200);
      }
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [animate]);

  const formatDateTime = (date) => {
    const datePart = date.toLocaleDateString('en-GB', {
      timeZone: timeZone,
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const timeOptions = {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    if (showSeconds) {
      timeOptions.second = '2-digit';
    }

    const timePart = date.toLocaleTimeString('en-US', timeOptions);

    return `${datePart}  ${timePart}`;
  };

  const formatAlternative = (date) => {
    const day = date.toLocaleDateString('en-GB', {
      timeZone: timeZone,
      day: '2-digit',
    });
    const month = date.toLocaleDateString('en-GB', {
      timeZone: timeZone,
      month: 'short',
    });
    const year = date.toLocaleDateString('en-GB', {
      timeZone: timeZone,
      year: 'numeric',
    });

    const timeOptions = {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    if (showSeconds) {
      timeOptions.second = '2-digit';
    }

    const time = date.toLocaleTimeString('en-US', timeOptions);

    return { date: `${day} ${month}, ${year}`, time };
  };

  const getFormattedDateTime = () => {
    switch (format) {
      case 'separated':
        return formatAlternative(currentDateTime);
      case 'compact':
        return currentDateTime.toLocaleString('en-GB', {
          timeZone: timeZone,
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
      default:
        return formatDateTime(currentDateTime);
    }
  };

  if (format === 'separated') {
    const { date, time } = getFormattedDateTime();
    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        <div className="flex items-center space-x-2">
          {showIcon && <Calendar className="h-4 w-4" />}
          <span className="text-sm font-medium">{date}</span>
        </div>
        <div className="flex items-center space-x-2 ">
          {showIcon && <Clock className="h-4 w-4" />}
          <span className="text-lg font-semibold">{time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${isUpdating && animate ? 'scale-105 opacity-75' : ''} transition-all duration-200 ${className}`}>
      {showIcon && <Clock className="h-4 w-4 text-gray-500" />}
      <span className="font-medium ">{getFormattedDateTime()}</span>
    </div>
  );
};

export default DateTimeDisplay;
