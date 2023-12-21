# Автоматическое создание React компонентов

Данный скрипт позволяет автоматически создавать react компоненты с необходимой структурой

## Пример

Допустим нам надо создать компонент `button`

Создаём новую папку 

```src/components/button```

в ней автоматически будет создано 3 файла: 
- index.ts
- Button.tsx
- Button.module.scss

`index.ts`

```tsx
export { Button } from './Button';
```

`Button.module.scss`

```
.button{
}
```

`Button.tsx`

```
interface ButtonProps {

}

export const Button = ({}: ButtonProps) => {
  return (
    <div className={classes.button}}>
      {/* Твой код здесь */}
    </div>
  );
};
```

## Установка (mac)

- файл `createReactComponent` надо засунуть в папку `/usr/local/bin/`, чтобы команда `createReactComponent` была доступна глобально из любой папки
- файл `auto-create-component.js` положить в папку с проектом, где лежит `package.json` 
- В `package.json` добавить скрипт 
   ```"auto-components": "node auto-create-component.js"``` (запустится node процесс)

p.s. чтобы не запускать 2 терминала с процессами, можно заюзать либу cuncurrently и добавить скрипт:
```
"start": "concurrently \"auto-components\" \"dev\""
```