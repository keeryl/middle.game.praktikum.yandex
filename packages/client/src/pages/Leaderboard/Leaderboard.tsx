import {  Table  } from "antd";


const data = [
  {
    position: "1",
    display_name: "Игрок1",
    totalScore: "100",
    countGame: "10",
    winnerCount: "10",
    defeatCount: "10",
    winRate: "100"
  },
  {
    position: "2",
    display_name: "Игрок2",
    totalScore: "90",
    countGame: "10",
    winnerCount: "9",
    defeatCount: "1",
    winRate: "90"
  },
  {
    position: "3",
    display_name: "Игрок3",
    totalScore: "80",
    countGame: "10",
    winnerCount: "8",
    defeatCount: "2",
    winRate: "80"
  },
  {
    position: "4",
    display_name: "Игрок4",
    totalScore: "70",
    countGame: "10",
    winnerCount: "7",
    defeatCount: "3",
    winRate: "70"
  },
];

export const Leaderboard = () => {
  const columns = [
    {
      title: 'Позиция',
      dataIndex: 'position',
      key: 'position',      
    },
    {
      title: 'Никнейм',
      dataIndex: 'display_name',
      key: 'display_name',
    },
    {
      title: 'Всего очков',
      dataIndex: 'totalScore',
      key: 'totalScore',
    },
    {
      title: 'Всего матчей',
      key: 'countGame',
      dataIndex: 'countGame',
    },
    {
      title: 'Побед',
      key: 'winnerCount',
      dataIndex: 'winnerCount',
    },
    {
      title: 'Поражений',
      key: 'defeatCount',
      dataIndex: 'defeatCount',
    },
    {
      title: 'Винрейт',
      key: 'winRate',
      dataIndex: 'winRate',
    },
  ];
  return <Table columns={columns} dataSource={data} />; 
}






