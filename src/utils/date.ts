import { formatDistanceToNow, format, isAfter, subMonths, parse } from 'date-fns';

/**
 * Parse MM-DD-YYYY format to Date object
 */
export function parseDate(dateString: string): Date {
  if (!dateString) {
    console.warn('parseDate: Empty date string received');
    return new Date();
  }
  
  // Check if already in MM-DD-YYYY format
  const mmddyyyyMatch = dateString.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (mmddyyyyMatch) {
    const [, month, day, year] = mmddyyyyMatch;
    // Parse as MM-DD-YYYY using date-fns
    const parsed = parse(dateString, 'MM-dd-yyyy', new Date());
    console.log(`parseDate: Parsed ${dateString} to ${parsed.toISOString()}`);
    return parsed;
  }
  
  // Try standard Date parsing for ISO format
  const parsed = new Date(dateString);
  console.log(`parseDate: Parsed ISO ${dateString} to ${parsed.toISOString()}`);
  return parsed;
}

/**
 * Check if a date is within the last 3 months (considered "new")
 */
export function isNew(dateString: string): boolean {
  try {
    const date = parseDate(dateString);
    const threeMonthsAgo = subMonths(new Date(), 3);
    
    const result = isAfter(date, threeMonthsAgo);
    
    console.log('isNew check:', {
      dateString,
      parsedDate: date.toISOString(),
      threeMonthsAgo: threeMonthsAgo.toISOString(),
      isNew: result,
      daysDifference: Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    });
    
    return result;
  } catch (error) {
    console.error('Error checking if date is new:', error, 'dateString:', dateString);
    return false;
  }
}

/**
 * Format date for display (MM-DD-YYYY)
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  // Check if already in MM-DD-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    return dateString;
  }
  
  try {
    const date = parseDate(dateString);
    return format(date, 'MM-dd-yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = parseDate(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return dateString;
  }
}

/**
 * Format date to full format (e.g., "January 15, 2024")
 */
export function formatFullDate(dateString: string): string {
  try {
    const date = parseDate(dateString);
    return format(date, 'MMMM dd, yyyy');
  } catch (error) {
    console.error('Error formatting full date:', error);
    return dateString;
  }
}

/**
 * Format date to short format (e.g., "Jan 15, 2024")
 */
export function formatShortDate(dateString: string): string {
  try {
    const date = parseDate(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    console.error('Error formatting short date:', error);
    return dateString;
  }
}

/**
 * Check if date string is valid
 */
export function isValidDate(dateString: string): boolean {
  try {
    const date = parseDate(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}
