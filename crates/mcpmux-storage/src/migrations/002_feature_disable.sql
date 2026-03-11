-- Add disabled column to server_features for per-feature disable toggle.
-- When disabled=1, the feature is filtered out during gateway resolution
-- (treated like is_available=0) but preserved across server reconnects.
ALTER TABLE server_features ADD COLUMN disabled INTEGER NOT NULL DEFAULT 0;
