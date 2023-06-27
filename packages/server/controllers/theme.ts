import type { Request, Response } from 'express'
import { SiteTheme } from "../models/siteTheme"
import { UserTheme } from "../models/userTheme"

export function getThemes(_request: Request, response: Response) {
    SiteTheme.findAll()
        .then(value => response.status(200).send(value))
        .catch(err => response.status(500).send(err))
}

export function createTheme(request: Request, response: Response) {
    if (!request.body.theme) {
        response.status(400).send('Неверный запрос')
    } else {
        SiteTheme.create({ theme: request.body.theme })
            .then(() => response.status(200).send('Тема была успешно создана'))
            .catch(err => response.status(500).send(err))
    }
}

export function deleteTheme(request: Request, response: Response) {
    if (!request.body.id) {
        response.status(400).send('Неверный запрос')
    } else {
        SiteTheme.destroy({ where: { id: request.body.id } })
            .then(value => {
                if (value) {
                    response.status(200).send('Запись успешно удалена');
                } else {
                    response.status(404).send('Запись не существует');
                }
            })
            .catch(err => response.status(500).send(err))
    }
}

export function findThemeWithUserId(request: Request, _response: Response) {
    return UserTheme.findOne({ where: { ownerId: request.body.id } })
}

export function createUserTheme(request: Request, _response: Response) {
    return UserTheme.create({ ownerId: request.body.id, theme: 'light' })
}

export function getUserTheme(request: Request, response: Response) {
    if (!request.body.id) {
        response.status(400).send('Неверный запрос')
    } else {
        findThemeWithUserId(request, response)
            .then(value => {
                if (value) {
                    response.status(200).send(value!.theme);
                } else {
                    throw 'Пустой объект';
                }
            })
            .catch(() => {
                createUserTheme(request, response)
                    .then(() => {
                        response.status(200).send('light')
                    })
                    .catch(err => {
                        response.status(500).send(err)
                    })
            })
    }
}

export function updateUserTheme(request: Request, response: Response) {
    if (!request.body.id || !request.body.theme) {
        response.status(400).send('Неверный запрос')
    } else {
        UserTheme.update({ theme: request.body.theme }, { where: { ownerId: request.body.id } })
            .then(value => {
                if (value[0] !== 0) {
                    response.status(200).send('Тема была успешно обновлена')
                } else {
                    response.status(200).send('Тема не найдена') 
                }
            })
            .catch(err => response.status(500).send(err))
    }
}
