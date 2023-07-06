import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Label,
  Text,
  Textarea,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";
// import './App.css'

const useStyles = makeStyles({
  root: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...shorthands.gap("1rem"),
  },
  cardList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    ...shorthands.gap("1rem"),
  },
  input: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
});

function App() {
  const styles = useStyles();
  const [boards, setBoards] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [dialog, setDialog] = useState<boolean>(false);

  function submit() {
    console.log(title, content);
    fetch("/api/v1/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDialog(true);
        setBoards([...boards, data]);
      });
  }

  useEffect(() => {
    fetch("/api/v1/boards", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBoards(data);
      });
  }, []);

  function formatDate(date: string) {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const day = localDate.getDay().toString().padStart(2, "0");
    const hour = localDate.getHours().toString().padStart(2, "0");
    const min = localDate.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${min}`;
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.input}>
          <Label htmlFor="title" size="large">
            主旨
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <Field label="內容">
            <Textarea
              resize="vertical"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </Field>
        </div>
        <Button
          appearance="primary"
          onClick={() => {
            submit();
          }}
        >
          送出
        </Button>
      </div>
      <br />
      <div className={styles.cardList}>
        {boards.map((board) => {
          return (
            <Card key={board.id}>
              <CardHeader
                header={
                  <Text>
                    {board.title} <br />
                    <small>{formatDate(board.createdAt)}</small>
                  </Text>
                }
              />
              <p style={{ whiteSpace: "pre-line" }}>{board.content}</p>
            </Card>
          );
        })}
      </div>
      <Dialog
        modalType="alert"
        open={dialog}
        onOpenChange={(event, data) => setDialog(data.open)}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>通知</DialogTitle>
            <DialogContent>
              <p>
                感謝您的建議與指教，針對提出的任何想法我們會在討論後做出調整和回答。{" "}
                <br />
                謝謝大家。 <br />
              </p>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">關閉</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
}

export default App;
