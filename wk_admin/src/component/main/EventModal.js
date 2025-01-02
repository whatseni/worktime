import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function EventModal({ open, onClose, info }) {
  return (
    <React.Fragment>
      <Dialog>
        <DialogTitle>근무 기록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {info}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>닫기</Button>
          <Button>수정정</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}