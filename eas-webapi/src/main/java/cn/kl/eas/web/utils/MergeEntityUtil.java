package cn.kl.eas.web.utils;

import java.lang.reflect.Field;

/**
 * Created by kl272 on 2017/6/17.
 * <p>
 * 将前端传递的 Entity 合并到数据库已有的记录实例中，同时实体类使用 DynamicUpdate 注解
 * <p>
 * 这样可以避免前后端传递太多数据，同时，更新时不必更新没变的字段
 */
public class MergeEntityUtil {

    public static Object merge(Object free, Object persistence, Class cls) throws IllegalAccessException {

        if (!free.getClass().getName().equals(cls.getName()) ||
                !persistence.getClass().getName().equals(cls.getName()))
            return null;

        Field[] fields = cls.getDeclaredFields();

        Field.setAccessible(fields, true);
        for (int i = 0; i < fields.length; i++) {
            Field field = fields[i];
            Object freeVal = field.get(free);
            Object perVal = field.get(persistence);
            if (freeVal != null && !freeVal.equals(perVal))
                field.set(persistence, field.get(free));
        }

        return persistence;
    }

}
