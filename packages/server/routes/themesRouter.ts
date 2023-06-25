import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { getThemes, createTheme, deleteTheme, getUserTheme, updateUserTheme } from "../controllers/theme";
import bodyParser from "body-parser";

export const themesRoutes = (router: Router) => {
    const themesRouter: Router = Router();

    const middlewares = [
        bodyParser.json(),
        checkAuth
    ];

    themesRouter
        .get('/siteTheme', ...middlewares, getThemes)
        .post('/siteTheme', ...middlewares, createTheme)
        .delete('/siteTheme', ...middlewares, deleteTheme)
        .get('/userTheme', ...middlewares, getUserTheme)
        .put('/userTheme', ...middlewares, updateUserTheme)

    router.use('/api/themes', themesRouter);
}; 
