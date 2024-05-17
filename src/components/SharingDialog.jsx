// ShareDialog.js
// ShareDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, EmailIcon, EmailShareButton } from 'react-share';

export default function ShareDialog({ open, onClose, url, title }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share this blog</DialogTitle>
      <DialogContent>
        <Box p={2}>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round />
            Share on WhatsApp
          </WhatsappShareButton>
        </Box>
        <Box p={2}>
          <FacebookShareButton url={url} title={title}>
            <FacebookIcon size={32} round />
            Share on Facebook
          </FacebookShareButton>
        </Box>
        <Box  p={2}>
          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={32} round />
            Share on Linkdin
          </LinkedinShareButton>
        </Box>
        <Box  p={2}>
          <EmailShareButton url={url} title={title}>
            <EmailIcon size={32} round />
            Share on Email
          </EmailShareButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

