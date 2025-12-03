import { FileText, Video, Code, FileType } from 'lucide-react';

export function getFileIcon(fileType: string) {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return FileText;
    case 'mp4':
      return Video;
    case 'html':
      return Code;
    case 'txt':
      return FileType;
    default:
      return FileText;
  }
}

export function getFileIconColor(fileType: string): string {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return 'text-red-600';
    case 'mp4':
      return 'text-purple-600';
    case 'html':
      return 'text-blue-600';
    case 'txt':
      return 'text-gray-600';
    default:
      return 'text-muted-foreground';
  }
}
