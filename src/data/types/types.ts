export interface Machine {
	id: string;
	name: string;
	serialNumber: string;
	imageUrl?: string;
	status: "operational" | "maintenance" | "offline";
	installationDate: string;
	location: string;
	isNew: boolean;
	documentCount: number;
}

export interface Document {
  id: string;
  filename: string;
  fileType: string;
  fileSize?: string;         // Optional - not all files have sizes
  uploadDate?: string;       // Optional - can use dateModified instead
  dateModified: string;      // Required
  serialNumber: string;      // Required
  machineId?: string;        // Optional - some docs aren't machine-specific
  category: DocumentCategory;
  fileUrl: string;           // Required
  isFavorite?: boolean;      // Optional - default false
  isNew?: boolean;           // Optional - calculated property
}



export type DocumentCategory =
	| "custom-documentation"
	| "manuals"
	| "mechanical-drawings"
	| "electrical-drawings"
	| "boms"
	| "translations"
	| "certificates"
	| "training";

export interface Notification {
	id: string;
	type: "document" | "training" | "system" | "service";
	message: string;
	timestamp: string;
	isRead: boolean;
}

export interface User {
	id: string;
	name: string;
	email: string;
	company: string;
	location: string;
	role: string;
}

export interface FavoriteDocument {
	id: string;
	filename: string;
	fileType: "pdf" | "html" | "mp4" | "txt";
}

export interface RecentDocument {
	id: string;
	filename: string;
	fileType: "pdf" | "html" | "mp4" | "txt";
	viewedAt: string;
}

export interface TrainingModule {
	id: string;
	title: string;
	type: "premium" | "video" | "computer-based";
	duration?: string;
	thumbnail?: string;
	url: string;
	isNew: boolean;
}
