export const classes = {
  paper: {
    marginTop: (theme) => theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: (theme) => theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: (theme) => theme.spacing(1),
    },
  },
  avatar: {
    margin: (theme) => theme.spacing(1),
    backgroundColor: (theme) => theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: (theme) => theme.spacing(3),
  },
  submit: {
    margin: (theme) => theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: (theme) => theme.spacing(2),
  },
};
