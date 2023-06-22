import { DataType, Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, Index } from 'sequelize-typescript';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'site_theme'
  })
  class SiteTheme extends Model<SiteTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;
  
    @Index
    @AllowNull(false)
      @Unique
    @Column(DataType.STRING)
    theme: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    description: string;
  } 
