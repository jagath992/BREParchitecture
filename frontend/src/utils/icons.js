import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  Building2,
  UserPlus,
  User,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Upload,
} from "lucide-react";

// Create a loading state for icons
export const useIconsLoaded = () => {
  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    // Check if all icon components are available
    const checkIconsLoaded = () => {
      const icons = [
        Plus,
        Edit,
        Trash2,
        Menu,
        X,
        Building2,
        UserPlus,
        User,
        ArrowLeft,
        Save,
        Eye,
        EyeOff,
        Upload,
      ];
      const allIconsLoaded = icons.every((icon) => icon !== undefined);

      if (allIconsLoaded) {
        setIconsLoaded(true);
      } else {
        // If not all icons are loaded, check again after a short delay
        setTimeout(checkIconsLoaded, 100);
      }
    };

    checkIconsLoaded();
  }, []);

  return iconsLoaded;
};

export {
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  Building2,
  UserPlus,
  User,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Upload,
};
